//import { sanitizeText } from './utils.js';

//document.addEventListener('DOMContentLoaded', () => {
// const statusText = document.getElementById('status-text');
//const sampleLyric = "I wanna be a star - Song Title Spoilers";

//const cleanLyric = sanitizeText(sampleLyric, ["Song Title Spoilers"]);

//statusText.textContent = `ES6 Modules Loaded Successfully! Test lyric: "${cleanLyric}"`;
//console.log("Neon Tracks Initialized.");
// });

import { sanitizeText } from './utils.js';
import { fetchTracksFromiTunes } from './apiService.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');

  statusText.textContent = "Fetching music data from iTunes...";

  // testing itunes function
  const tracks = await fetchTracksFromiTunes('kpop', 10);

  if (tracks.length > 0) {
    console.log('🎵 iTunes Tracks Loaded:', tracks);
    const firstTrack = tracks[0];
    statusText.innerHTML = `
      <strong>API Success!</strong><br>
      Loaded ${tracks.length} tracks.<br>
      Sample: <em>${firstTrack.title}</em> by <strong>${firstTrack.artist}</strong>
    `;
  } else {
    statusText.textContent = "Failed to load tracks. Check console for details.";
  }
});