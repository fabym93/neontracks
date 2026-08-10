/**
 * Utility functions for Neon Tracks
 */

/**
 * Sanitizes lyrics by replacing target words (song title, artist name) with placeholders
 * @param {string} text - The raw lyrics text
 * @param {Array<string>} forbiddenWords - Words/phrases to censor (title, artist, etc.)
 * @returns {string} Sanitized lyrics
 */
export function sanitizeText(text, forbiddenWords = []) {
  if (!text) return '';

  let sanitized = text;

  forbiddenWords.forEach(word => {
    if (!word || word.trim() === '') return;

    // escaped special characters in the word for regex
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create Regex that searches for the word ignoring case
    const regex = new RegExp(escapedWord, 'gi');
    
    // Replace with neon dashes/stars
    sanitized = sanitized.replace(regex, '█████');
  });

  return sanitized;
}