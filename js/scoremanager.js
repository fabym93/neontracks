/**
 * Score & Streak Manager for Neon Tracks
 * Manages player score, answer streak tracking, and dynamic multipliers.
 */

export class ScoreManager {
  constructor() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
  }

  /**
   * Resets score and streak back to initial state
   */
  reset() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
  }

  /**
   * Calculates the current multiplier based on answer streak
   * @returns {number} Multiplier value (1x, 1.5x, 2x, 3x)
   */
  getMultiplier() {
    if (this.streak >= 5) return 3;
    if (this.streak >= 3) return 2;
    if (this.streak >= 2) return 1.5;
    return 1;
  }

  /**
   * Records a correct answer, increases streak, and adds multiplied score
   * @param {number} basePoints - Base points calculated from time remaining
   * @returns {Object} Object containing earned points, current total score, streak, and multiplier
   */
  recordCorrectAnswer(basePoints) {
    this.streak++;
    if (this.streak > this.maxStreak) {
      this.maxStreak = this.streak;
    }

    const multiplier = this.getMultiplier();
    const pointsEarned = Math.round(basePoints * multiplier);
    this.score += pointsEarned;

    return {
      pointsEarned,
      totalScore: this.score,
      streak: this.streak,
      multiplier
    };
  }

  /**
   * Records an incorrect answer or time out, resetting the current streak
   */
  recordWrongAnswer() {
    this.streak = 0;
    return {
      totalScore: this.score,
      streak: this.streak,
      multiplier: 1
    };
  }
}