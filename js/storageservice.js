/**
 * StorageService - Manages localStorage operations for scores & settings
 */
const STORAGE_KEYS = {
  HIGH_SCORES: 'neon_tracks_high_scores',
  SETTINGS: 'neon_tracks_settings'
};

export const StorageService = {
  getHighScores() {
    const scores = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
    return scores ? JSON.parse(scores) : [];
  },

  saveScore(newScore) {
    const scores = this.getHighScores();
    const entry = {
      id: Date.now(),
      score: newScore.totalScore,
      accuracy: newScore.accuracy,
      rank: newScore.rank,
      genre: newScore.genre,
      date: new Date().toLocaleDateString()
    };

    scores.push(entry);
    // Sort descending by score & keep Top 10
    scores.sort((a, b) => b.score - a.score);
    const topTen = scores.slice(0, 10);

    localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(topTen));
    return topTen;
  },

  getSettings() {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : { soundFx: true, volume: 0.8 };
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};