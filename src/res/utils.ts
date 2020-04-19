import { Platform, Linking } from 'react-native'

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

export const openInStore = async ({
  appName,
  appStoreId,
  appStoreLocale = 'us',
  playStoreId,
}) => {
  if (Platform.OS === 'ios') {
    Linking.openURL(
      `https://itunes.apple.com/${appStoreLocale}/app/${appName}/id${appStoreId}`
    )
  } else {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${playStoreId}`
    )
  }
}
