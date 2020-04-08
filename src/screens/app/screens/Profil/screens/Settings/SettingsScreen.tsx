import React from 'react'
import { View, StyleSheet, Alert, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'

export const SettingsScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.close}>
        <MinimalButton
          iconName="chevron_left"
          iconColor="dark200"
          onAction={() => navigation.goBack()}
        />
      </View>

      <Label primary="Paramètres" />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
  },
})
