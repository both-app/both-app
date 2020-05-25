import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'
import { getUrlFromPath, deleteFromPath } from 'res/image'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'
import { FormContext } from '../../Form.context'
import { UserAvatar } from 'screens/components/UserAvatar'

export const AvatarScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const { values, setValue } = useContext(FormContext)

  const handleOnNext = () => navigation.navigate('PushNotification')

  const handleAvatarUpload = async (path: string) => {
    // In the case the user upload multiple images, we delete the old images
    if (values.avatarPath) {
      deleteFromPath(values.avatarPath)
    }

    setValue('avatarPath', path)

    const avatarUrl = await getUrlFromPath(path)

    setAvatarUrl(avatarUrl)
  }

  const handleOnBack = () => navigation.goBack()

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={t('auth:screen:form:avatar:title')}
          secondary={t('auth:screen:form:avatar:subtitle')}
        />
      }
      bottomInfo={
        <View style={{ paddingHorizontal: 24 }}>
          <Info
            color="dark200"
            secondary={t('auth:screen:form:avatar:info:subtitle')}
          />
        </View>
      }
    >
      <View style={styles.avatarContainer}>
        <UserAvatar
          firstName={values.firstName}
          avatarUrl={avatarUrl}
          onAvatarUploaded={handleAvatarUpload}
          borderWidth={0}
        />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 52,
  },
})
