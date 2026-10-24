/**
 * Sanitizes URLs to prevent javascript: or data: pseudo-protocol XSS injection in <a href={...}>
 */
export const sanitizeUrl = (url) => {
    if (!url || typeof url !== 'string') return '#';
    const trimmed = url.trim();
    
    // Relative routes or hashes are safe
    if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
        return trimmed;
    }

    try {
        const parsed = new URL(trimmed);
        if (
            parsed.protocol === 'http:' ||
            parsed.protocol === 'https:' ||
            parsed.protocol === 'mailto:' ||
            parsed.protocol === 'tel:'
        ) {
            return trimmed;
        }
    } catch {
        return '#';
    }

    return '#';
};
