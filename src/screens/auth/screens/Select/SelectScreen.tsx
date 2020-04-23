import React, { useCallback } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Label } from 'library/components/Label'
import { Logo } from '../../components/Logo'

export const SelectScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.bottom}>
        <Label
          primary={t('auth:screen:select:title')}
          secondary={t('auth:screen:select:subtitle')}
        />

        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => navigation.navigate('Form')}
          testID="tapYourFirstnameButton"
          activeOpacity={0.5}
        >
          <Text style={styles.putYourName}>
            {t('auth:screen:select:tapYourFirstname')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark100,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    backgroundColor: colors.skin100,
    paddingTop: 32,
    paddingBottom: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 48,
  },
  putYourName: {
    fontSize: 28,
    color: colors.grey100,
  },
})
