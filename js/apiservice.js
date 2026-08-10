/**
 * Service to interact with external APIs (iTunes Search API)
 */

const ITUNES_BASE_URL = 'https://itunes.apple.com/search';

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