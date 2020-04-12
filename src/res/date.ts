import isValid from 'date-fns/isValid'

export const isValidDate = (year: number, month: number, day: number) => {
  return isValid(new Date(`${year}-${month}-${day}`))
}

export const getDifferenceWithNow = (date: Date) => {
  const deadline = date.getTime()
  const now = new Date().getTime()
  const t = deadline - now

  const days = Math.floor(t / (1000 * 60 * 60 * 24))
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((t % (1000 * 60)) / 1000)

  return {
    days,
    hours: ('0' + hours).slice(-2),
    minutes: ('0' + minutes).slice(-2),
    seconds: ('0' + seconds).slice(-2),
  }
}
