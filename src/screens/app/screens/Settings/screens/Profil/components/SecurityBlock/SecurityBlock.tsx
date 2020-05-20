import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Info } from 'library/components/Info'

export const SecurityBlock = () => {
  const { t } = useT()

  return (
    <View style={styles.securityBlock}>
      <Text style={styles.lock}>🔒</Text>
      <Info
        primary="Tes données sont en sécurité"
        secondary="Ne t’inquiètes pas pour ça, on les conserve bien au chaud et ça ne sortira pas de chez nous !"
        color="dark200"
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  securityBlock: {
    backgroundColor: colors.skin200,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  lock: {
    fontSize: 60,
    marginBottom: 8,
  },
})
