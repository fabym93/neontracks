/**
 * Game Engine Module for Neon Tracks
 * Handles question generation, answer shuffling, and game round logic.
 */

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled array
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generates a trivia question object with 1 correct answer and 3 incorrect options.
 * @param {Object} targetTrack - The track selected for the current round
 * @param {Array} allTracks - The full list of tracks available to pick distractors from
 * @param {string} mode - 'lyrics' or 'audio' mode
 * @returns {Object} Question configuration object
 */
export function generateQuestion(targetTrack, allTracks, mode = 'lyrics') {
    if (!targetTrack || !allTracks || allTracks.length < 4) {
        console.error('Insufficient tracks to generate a proper question.');
        return null;
    }

    // 1. obtain distractor candidates (excluding the correct answer)
    const distractorCandidates = allTracks.filter(track => track.id !== targetTrack.id);

    // 2. Shuffle and select 3 random distractors
    const shuffledCandidates = shuffleArray(distractorCandidates);
    const selectedDistractors = shuffledCandidates.slice(0, 3);

    // 3. Define the correct answer and incorrect options
    const correctAnswer = targetTrack.title;
    const incorrectAnswers = selectedDistractors.map(track => track.title);

    // 4. mix all options and shuffle them randomly
    const options = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
        trackId: targetTrack.id,
        artist: targetTrack.artist,
        artwork: targetTrack.artwork,
        previewUrl: targetTrack.previewUrl,
        correctAnswer: correctAnswer,
        options: options,
        mode: mode
    };
}