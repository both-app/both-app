import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface MedalProps {
  type: 'winner' | 'loser'
}

export const Medal: FC<MedalProps> = ({ type }) => (
  <View style={styles.medal}>
    <Text style={{ fontSize: type === 'winner' ? 40 : 30 }}>
      {type == 'winner' ? '🥇' : '🥈'}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  medal: {
    position: 'absolute',
    fontSize: 40,
    zIndex: 100,
    bottom: -15,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
