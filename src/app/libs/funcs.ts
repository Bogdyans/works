export function validateString(str: string) {
    if (str && str.length < 8) {
        return false;
    }

    const allowedCharsRegex = /^[a-zA-Z0-9\-]+$/;
    return allowedCharsRegex.test(str);
}