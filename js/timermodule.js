/**
 * Timer Module for Neon Tracks
 * Manages question countdowns and dynamic point decay based on response speed.
 */

export class TimerModule {
  /**
   * @param {number} duration - Time in seconds for each round (default 15s)
   * @param {number} maxPoints - Maximum base points for an instant correct answer (default 1000)
   */
  constructor(duration = 15, maxPoints = 1000) {
    this.duration = duration;
    this.maxPoints = maxPoints;
    this.timeRemaining = duration;
    this.timerId = null;
    this.onTickCallback = null;
    this.onTimeUpCallback = null;
  }

  /**
   * Starts the countdown timer
   * @param {Function} onTick - Callback executed every second with remaining time
   * @param {Function} onTimeUp - Callback executed when timer reaches 0
   */
  start(onTick, onTimeUp) {
    this.stop(); // Ensure no previous timers are running
    this.timeRemaining = this.duration;
    this.onTickCallback = onTick;
    this.onTimeUpCallback = onTimeUp;

    // run the tick callback immediately to update UI before the first second passes
    if (this.onTickCallback) this.onTickCallback(this.timeRemaining);

    this.timerId = setInterval(() => {
      this.timeRemaining--;

      if (this.onTickCallback) {
        this.onTickCallback(this.timeRemaining);
      }

      if (this.timeRemaining <= 0) {
        this.stop();
        if (this.onTimeUpCallback) {
          this.onTimeUpCallback();
        }
      }
    }, 1000);
  }

  /**
   * Stops/pauses the timer
   */
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Calculates dynamic score based on remaining time (Point Decay)
   * @returns {number} Calculated score for the round
   */
  calculateScore() {
    if (this.timeRemaining <= 0) return 0;
    
    // the score decays linearly from maxPoints to a minimum of 200 points as time runs out
    const ratio = this.timeRemaining / this.duration;
    const calculatedScore = Math.round(this.maxPoints * ratio);
    
    return Math.max(calculatedScore, 200); 
  }
}