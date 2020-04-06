export const getNativeEmoji = (value: string) => {
  if (!value.startsWith('0x')) {
    return value
  }

  const codePoints = value.split(' ').map(Number)

  return String.fromCodePoint(...codePoints)
}
