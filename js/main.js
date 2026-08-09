import { fetchTracksFromiTunes } from './apiservice.js';
import { generateQuestion } from './gameengine.js';
import { TimerModule } from './timermodule.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');
  statusText.textContent = "Initializing Timer Test...";

  const tracks = await fetchTracksFromiTunes('bts', 5);
  const question = generateQuestion(tracks[0], tracks, 'lyrics');

  // temporizer with 10 seconds duration and 1000 max points
  const timer = new TimerModule(10, 1000);

  // start the timer and update the status text every second
  timer.start(
    (secondsLeft) => {
      // Callback for each second (Tick)
      const potentialPoints = timer.calculateScore();
      statusText.innerHTML = `
        <strong>Timer & Dynamic Decay Test</strong><br>
        Track: <em>${question.correctAnswer}</em><br><br>
        <span style="font-size: 2rem; color: var(--neon-pink);">${secondsLeft}s</span><br>
        <small style="color: var(--neon-cyan);">Current Potential Score: ${potentialPoints} pts</small>
      `;
    },
    () => {
      // Callback when time is up
      statusText.innerHTML += `<br><br><strong style="color: red;">⏰ TIME'S UP! (0 pts)</strong>`;
    }
  );
});