import * as ImagePicker from 'expo-image-picker'

export const useImagePicker = () => {
  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted) {
      return ImagePicker.launchImageLibraryAsync()
    }
  }

  return {
    openImagePicker,
  }
}
