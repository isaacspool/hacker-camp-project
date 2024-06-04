export function getSearchParamsInt(value, otherwise) {
    return value
        ? parseInt(value) == 0 || parseInt(value)
            ? parseInt(value)
            : otherwise
        : otherwise;
}
