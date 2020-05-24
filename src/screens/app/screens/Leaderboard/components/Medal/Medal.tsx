import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface MedalProps {
  type: 'winner' | 'loser' | 'draw'
}

export const Medal: FC<MedalProps> = ({ type }) => (
  <View style={styles.medal}>
    <Text style={{ fontSize: 26 }}>
      {type === 'winner' || type === 'draw' ? '🥇' : '🥈'}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  medal: {
    position: 'absolute',
    zIndex: 100,
    top: 10,
    bottom: 0,
    left: -16,
    right: 0,
  },
})
