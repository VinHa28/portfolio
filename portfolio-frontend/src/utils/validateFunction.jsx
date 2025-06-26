export const checkLengthInRange = (fieldName, value, min, max) => {
    if (value.length < min)
        return `${fieldName} must be at least ${min} characters.`;
    if (value.length > max)
        return `${fieldName} must not exceed ${max} characters.`;
    return null;
};

export const checkRequired = (fieldName, value) => {
    return value.length > 0 ? null : `${fieldName} cannot be empty.`;
};

export const checkEmailFormat = (fieldName, value) => {
    if (!value || typeof value !== "string") return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
        ? null
        : `${fieldName} is not a valid email address.`;
};

export const checkMaxLength = (fieldName, value, max) => {
    if (!value || typeof value !== "string") return null;
    return value.length > max
        ? `${fieldName} must be at most ${max} characters.`
        : null;
};
