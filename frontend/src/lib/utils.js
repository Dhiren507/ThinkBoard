export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Formats text by converting patterns to HTML formatting
 * Currently supported:
 * - Text between *** becomes bold (e.g., ***bold*** -> <strong>bold</strong>)
 */
export function formatTextContent(text) {
    if (!text) return '';
    
    // Replace ***text*** with <strong>text</strong> for bold formatting
    const boldPattern = /\*\*\*(.*?)\*\*\*/g;
    return text.replace(boldPattern, '<strong>$1</strong>');
}