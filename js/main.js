import { ScoreManager } from './scoremanager.js';

document.addEventListener('DOMContentLoaded', () => {
  const statusText = document.getElementById('status-text');
  const scoreMgr = new ScoreManager();

  // simulate a series of correct answers to test streak and multiplier logic
  const sim1 = scoreMgr.recordCorrectAnswer(500); // streak1 -> x1
  const sim2 = scoreMgr.recordCorrectAnswer(500); // streak2 -> x1.5
  const sim3 = scoreMgr.recordCorrectAnswer(500); // streak3 -> x2
  const sim4 = scoreMgr.recordCorrectAnswer(500); // streak4 -> x2
  const sim5 = scoreMgr.recordCorrectAnswer(500); // streak5 -> x3
  statusText.innerHTML = `
    <
    strong>Streak & Multipliers Test Success!</strong><br><br>
    <div style="text-align: left; font-size: 0.85rem; line-height: 1.6;">

      • Round 1: +${sim1.pointsEarned} pts (Streak: ${sim1.streak}, Mult: ${sim1.multiplier}x)<br>
      • Round 2: +${sim2.pointsEarned} pts (Streak: ${sim2.streak}, Mult: ${sim2.multiplier}x)<br>
      • Round 3: +${sim3.pointsEarned} pts (Streak: ${sim3.streak}, Mult: ${sim3.multiplier}x)<br>
      • Round 4: +${sim4.pointsEarned} pts (Streak: ${sim4.streak}, Mult: ${sim4.multiplier}x)<br>
      • Round 5: +${sim5.pointsEarned} pts (Streak: ${sim5.streak}, Mult: ${sim5.multiplier}x)<br>
      <br>
      <strong style="color: var(--neon-cyan);">Total Score: ${scoreMgr.score} pts</strong><br>
      <strong style="color: var(--neon-pink);">Max Streak: ${scoreMgr.maxStreak} 🔥</strong>
    </div>
  `;
});