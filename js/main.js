import { fetchTracksFromiTunes, getValidTrackWithLyrics } from './apiservice.js';
import { generateQuestion } from './gameengine.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');
  statusText.textContent = "Loading Game Engine Test...";

  // 1. Fetch a batch of tracks
  const tracks = await fetchTracksFromiTunes('bts', 10);

  if (tracks.length >= 4) {
    const target = tracks[0];

    // 2. generate question
    const question = generateQuestion(target, tracks, 'lyrics');

    console.log('🎯 Target Track:', target);
    console.log('❓ Generated Question Object:', question);

    statusText.innerHTML = `
      <strong>Game Engine Test Passed!</strong><br>
      Correct Song: <em>${question.correctAnswer}</em> by <strong>${question.artist}</strong><br><br>
      <small style="color: var(--neon-cyan);">Shuffled Options:</small>
      <ul style="list-style: none; padding: 0; margin-top: 8px;">
        ${question.options.map(opt => `<li style="margin: 4px 0;">• ${opt} ${opt === question.correctAnswer ? '✅' : ''}</li>`).join('')}
      </ul>
    `;
  } else {
    statusText.textContent = "Not enough tracks returned from API.";
  }
});