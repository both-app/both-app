/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 */
export const isValidDate = (year: number, month: number, day: number) => {
  const m = parseInt(`${month}`, 10) - 1

  return m >= 0 && m < 12 && day > 0 && day <= daysInMonth(m, year)
}

/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 */
const daysInMonth = (month: number, year: number) => {
  switch (month) {
    case 1:
      return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28
    case 8:
    case 3:
    case 5:
    case 10:
      return 30
    default:
      return 31
  }
}

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  // @ts-ignore
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}
