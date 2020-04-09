import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

export const getExpoPushToken = async () => {
  if (!Constants.isDevice) {
    return ''
  }

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )

  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus === 'granted') {
    return Notifications.getExpoPushTokenAsync()
  }

  return ''
}
