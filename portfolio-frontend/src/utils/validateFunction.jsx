export const checkLengthInRange = (fieldName, value, min, max) => {
    if (value.length < min) return `${fieldName} must be at least ${min} characters.`;
    if (value.length > max) return `${fieldName} must not exceed ${max} characters.`;
    return null;
};

export const checkRequired = (fieldName, value) => {
    return value.length > 0 ? null : `${fieldName} cannot be empty.`
}