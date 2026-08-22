const RE_LEADING_SLASHES = /^\/+/;
const RE_TRAILING_SLASHES = /\/+$/;

/**
 * Converts a configured path prefix to an absolute path without a trailing slash.
 */
export const normalizePathPrefix = (prefix?: string): string => {
    const normalizedPrefix = (prefix ?? '')
        .replace(RE_LEADING_SLASHES, '')
        .replace(RE_TRAILING_SLASHES, '');

    return normalizedPrefix ? `/${normalizedPrefix}` : '';
};

/**
 * Adds a configured prefix to an internal path.
 */
export const addPathPrefix = (path: string, prefix?: string): string => {
    const normalizedPrefix = normalizePathPrefix(prefix);
    if (!normalizedPrefix) {
        return path;
    }

    const normalizedPath = path ? `/${path.replace(RE_LEADING_SLASHES, '')}` : '';

    return normalizedPrefix + normalizedPath;
};

/**
 * Removes a configured prefix from an external path without matching partial segments.
 */
export const removePathPrefix = (path: string, prefix?: string): string => {
    const normalizedPrefix = normalizePathPrefix(prefix);
    if (!normalizedPrefix || !path.startsWith(normalizedPrefix)) {
        return path;
    }

    const remainder = path.slice(normalizedPrefix.length);
    if (!remainder) {
        return '/';
    }

    if (remainder.startsWith('/')) {
        return remainder;
    }

    if (remainder.startsWith('?') || remainder.startsWith('#')) {
        return '/' + remainder;
    }

    return path;
};
