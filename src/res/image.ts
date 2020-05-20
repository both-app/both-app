import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { nanoid } from 'nanoid/async/index.native.js'

import firebase from './firebase'

const storage = firebase.storage()

export const getCameraPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status !== 'granted') {
      throw new Error('permission not granted')
    }
  }
}

/**
 * Return the path of the file
 */
export const uploadImage = async (type: 'avatar', uri: string) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })) as Blob

  const key = (await nanoid()) as string
  const ref = storage.ref().child(type).child(key)
  const snapshot = await ref.put(blob)

  // We're done with the blob, close and release it
  // @ts-ignore
  blob.close()

  return snapshot.ref.fullPath
}

export const getUrlFromPath = (path: string) => {
  try {
    return storage.ref(path).getDownloadURL()
  } catch (e) {
    return ''
  }
}

export const deleteFromPath = (url: string) => {
  try {
    storage.ref(url).delete()
  } catch (e) {}
}
