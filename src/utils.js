export function formatDate(date) {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function formatPeriod(period) {
    const minutes = period % 60
    const hours = (period - minutes) / 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}