export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const groupBy = <T>(
  values: T[],
  iteratee: string | Function
): { [t: string]: T[] } => {
  return values.reduce((acc, v) => {
    const valueCheck = typeof iteratee === 'string' ? v[iteratee] : iteratee(v)

    return {
      ...acc,
      [valueCheck]: [...(acc[valueCheck] || []), v],
    }
  }, {})
}
