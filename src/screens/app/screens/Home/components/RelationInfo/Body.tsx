import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Avatar } from 'library/components/Avatar'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

import { useCounter } from './useCounter'

interface BodyProps {
  leftFirstName: string
  leftAvatarUrl?: string
  rightFirstName: string
  rightAvatarUrl?: string
  leftPoints: number
  rightPoints: number
}

export const Body: FC<BodyProps> = ({
  leftFirstName,
  rightFirstName,
  leftAvatarUrl,
  rightAvatarUrl,
  ...props
}) => {
  const leftPoints = useCounter(props.leftPoints)
  const rightPoints = useCounter(props.rightPoints)

  return (
    <View style={styles.bodyContainer}>
      <Avatar firstname={leftFirstName} avatar={leftAvatarUrl} size="small" />

      <View style={styles.counterContainer}>
        <View style={styles.left}>
          <Text style={{ ...styles.text, ...styles.leftText }}>
            {leftPoints}
          </Text>
        </View>

        <View>
          <Text style={styles.text}> : </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.text}>{rightPoints}</Text>
        </View>
      </View>

      <Avatar firstname={rightFirstName} avatar={rightAvatarUrl} size="small" />
    </View>
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  counterContainer: {
    flex: 1,
    borderColor: 'red',
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 48,
    color: colors.white,
  },
  left: {
    flex: 1,
  },
  leftText: {
    textAlign: 'right',
  },
  right: {
    flex: 1,
  },
})
