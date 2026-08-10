import { sanitizeText } from './utils.js';
import { fetchTracksFromiTunes, getValidTrackWithLyrics } from './apiservice.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');
  statusText.textContent = "Testing API Fallback & Lyric Sanitizer...";

  // 1. songs list from iTunes API (BTS as example)
  const tracks = await fetchTracksFromiTunes('bts', 5);

  // 2. obtain the first track with valid lyrics from LRCLIB API
  const result = await getValidTrackWithLyrics(tracks);

  if (result) {
    // 3. sanitize the lyrics by removing the track title and artist name
    const cleanLyrics = sanitizeText(result.lyrics, [result.track.title, result.track.artist]);

    console.log('🎵 Selected Track:', result.track);
    console.log('🔒 Censored Lyrics:', cleanLyrics);

    statusText.innerHTML = `
      <strong>Fallback & Sanitizer Test Success!</strong><br>
      Track: <em>${result.track.title}</em> - <strong>${result.track.artist}</strong><br><br>
      <small style="color: var(--neon-cyan);">Censored Snippet:</small><br>
      <p style="font-size: 0.85rem; font-style: italic; margin-top: 8px;">
        "${cleanLyrics.substring(0, 120)}..."
      </p>
    `;
  } else {
    statusText.textContent = "Could not find valid tracks with lyrics.";
  }
});