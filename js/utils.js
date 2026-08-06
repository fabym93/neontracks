/**
 * Utility function to sanitize lyrics by removing target song titles.
 */
export function sanitizeText(text, targetWords = []) {
    if (!text) return '';
    let cleaned = text;
    targetWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        cleaned = cleaned.replace(regex, '•••••');
    });
    return cleaned;
}