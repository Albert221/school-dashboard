export function encodeParams(strings, ...values) {
    return strings.reduce((combined, str, i) => {
        return combined + str + encodeURIComponent(values[i] || '')
    }, '')
}