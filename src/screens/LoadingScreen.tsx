import React, { memo } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'

import { colors } from 'res/colors'

export const LoadingScreen = memo(() => {
  const { width, height } = Dimensions.get('window')

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={{ height: height, width: width }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Same color for the SplashScreen configuration into app.json
    backgroundColor: colors.skin100,
  },
})
