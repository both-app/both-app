import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { useT } from 'res/i18n'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { Value } from './Value'

export const UserInfo = () => {
  const { t } = useT()
  const { me } = useContext(UsersContext)

  const formattedGender = {
    male: t('male'),
    female: t('female'),
    other: t('other'),
  }[me.gender]

  return (
    <View style={styles.userInfoBlock}>
      <Value
        label={t('app:screen:profil:firstName')}
        value={me.firstName}
        marginBottom={16}
      />
      <Value label={t('app:screen:profil:gender')} value={formattedGender} />
    </View>
  )
}

export const styles = StyleSheet.create({
  userInfoBlock: {
    marginTop: 32,
  },
})
