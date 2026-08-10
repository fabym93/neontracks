/**
 * Service to interact with external APIs (iTunes Search API)
 */

const ITUNES_BASE_URL = 'https://itunes.apple.com/search';
const LRCLIB_BASE_URL = 'https://lrclib.net/api/get';

/**
 * Fetches tracks from iTunes API based on term/genre and filters those with audio previews.
 * @param {string} term - Search term (e.g., 'pop', 'rock', 'Taylor Swift')
 * @param {number} limit - Number of raw results to fetch (default 25)
 * @returns {Promise<Array>} List of cleaned track objects with guaranteed previewUrl
 */
export async function fetchTracksFromiTunes(term = 'pop', limit = 25) {
  try {
    const url = `${ITUNES_BASE_URL}?term=${encodeURIComponent(term)}&media=music&entity=song&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // filter songs that have audio preview (previewUrl) and structure the data
    const validTracks = data.results
      .filter(track => track.previewUrl && track.trackName && track.artistName)
      .map(track => ({
        id: track.trackId,
        title: track.trackName,
        artist: track.artistName,
        album: track.collectionName,
        artwork: track.artworkUrl100.replace('100x100bb', '400x400bb'), // Better resolution of cover art
        previewUrl: track.previewUrl,
        genre: track.primaryGenreName
      }));

    return validTracks;

  } catch (error) {
    console.error('Error fetching tracks from iTunes:', error);
    return [];
  }
}


/**
 * Fetches plain synced or unsynced lyrics from LRCLIB API for a given track.
 * @param {string} trackName - Title of the track
 * @param {string} artistName - Name of the artist
 * @returns {Promise<string|null>} Cleaned plain lyrics or null if not found
 */
export async function fetchLyricsFromLRCLIB(trackName, artistName) {
  try {
    const url = `${LRCLIB_BASE_URL}?track_name=${encodeURIComponent(trackName)}&artist_name=${encodeURIComponent(artistName)}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Lyrics not found on LRCLIB for: "${trackName}" by ${artistName}`);
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // prefer plain lyrics if available, otherwise synced lyrics, else null
    const lyrics = data.plainLyrics || data.syncedLyrics || null;
    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics from LRCLIB:', error);
    return null;
  }
}


/** (helper function)
 * Fetches track with guaranteed lyrics fallback logic
 * @param {Array} tracksList - Array of tracks from iTunes
 * @returns {Promise<Object|null>} Object containing track and its lyrics, or fallback error
 */
export async function getValidTrackWithLyrics(tracksList) {
  if (!tracksList || tracksList.length === 0) {
    return null;
  }

  for (const track of tracksList) {
    const lyrics = await fetchLyricsFromLRCLIB(track.title, track.artist);
    if (lyrics) {
      return {
        track,
        lyrics
      };
    }
  }

  // Fallback if no tracks in the current list have lyrics
  return {
    track: tracksList[0],
    lyrics: "♪ Instrumental / No lyrics preview available for this track ♪"
  };
}