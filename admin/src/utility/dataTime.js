const shortDate = (date) => {
    return (new Date(date)).toLocaleString('en-BD', {year: 'numeric', month: 'short', day: 'numeric'})
}

const shortDateWithTime = (date) => {
    if (!date) return 'N/A'
    return (new Date(date)).toLocaleString('en-BD', {dateStyle: 'medium'}) + ' ' + (new Date(date)).toLocaleString('en-BD', {timeStyle: 'short'})
}

const minuteToHours = (minute) => {
    if (!minute) return 'N/A'
    return (minute / 60).toFixed(1) + ' hr'
}

module.exports = {shortDate, minuteToHours, shortDateWithTime}