import { sanitizeText } from './utils.js';
import { fetchTracksFromiTunes, fetchLyricsFromLRCLIB } from './apiservice.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');
  
  statusText.textContent = "Fetching music and lyrics data...";

  // 1. obtain a sample track from iTunes API (K-Pop genre)
  const tracks = await fetchTracksFromiTunes('kpop', 5);

  if (tracks.length > 0) {
    const sampleTrack = tracks[0];
    console.log('🎵 Track Selected:', sampleTrack);

    // 2. search
    const rawLyrics = await fetchLyricsFromLRCLIB(sampleTrack.title, sampleTrack.artist);

    if (rawLyrics) {
      // 3. hidden sanitization step to remove any unwanted content from the lyrics
      const cleanLyrics = sanitizeText(rawLyrics, [sampleTrack.title]);

      console.log('📜 Original Lyrics Preview:', rawLyrics.substring(0, 150));
      console.log('🔒 Sanitized Lyrics Preview:', cleanLyrics.substring(0, 150));

      statusText.innerHTML = `
        <strong>API & Lyrics Success!</strong><br>
        Track: <em>${sampleTrack.title}</em> - <strong>${sampleTrack.artist}</strong><br><br>
        <small style="color: var(--neon-cyan);">Lyrics Snippet:</small><br>
        <p style="font-size: 0.85rem; font-style: italic;">"${cleanLyrics.substring(0, 120)}..."</p>
      `;
    } else {
      statusText.innerHTML = `
        <strong>Track Loaded!</strong><br>
        <em>${sampleTrack.title}</em> by <strong>${sampleTrack.artist}</strong><br>
        <small>(No lyrics found for this track on LRCLIB)</small>
      `;
    }
  } else {
    statusText.textContent = "Failed to load tracks. Check console for details.";
  }
});