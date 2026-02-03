export const maskEmail = (email: string) => {
    const regexp = /(?<=.)[^@\n](?=[^@\n]*?@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/i;
    return email.replace(regexp, '*');
}

export const capitalize = (value: string): string => {
    return value.replace(new RegExp('^.{1,1}'), (v) => v.toUpperCase());
}

export const titlize = (value: string): string|null => {
    let parts = value?.replace(new RegExp('[-_]', 'gi'), ' ').split(new RegExp('(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])'));
    if(!parts?.length) {
        return null;
    }

    const firstWord = parts.shift();
    const lastWord = parts.pop();
    parts = parts.map((v) => v.toLowerCase());

    if(firstWord) {
        parts.unshift(capitalize(firstWord));
    }

    if(lastWord) {
        parts.push(capitalize(lastWord));
    }

    return parts.join(' ');
}
