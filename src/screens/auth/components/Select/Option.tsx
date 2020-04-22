import React, { FC, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors } from 'res/colors'

interface OptionProps {
  emoji: string
  label: string
  value: string
  extraInfo?: string
  onAction: (value: string) => void
  selected?: boolean
}

export const Option: FC<OptionProps> = memo(
  ({ emoji, label, onAction, value, selected, extraInfo }) => {
    const containerStyle = {
      ...styles.container,
      ...(selected ? styles.blueContainer : {}),
    }

    const labelStyle = {
      ...styles.label,
      ...(selected ? styles.whiteText : {}),
    }

    const extraInfoStyle = {
      ...styles.extraInfo,
      ...(selected ? styles.extraInfoActive : {}),
    }

    const handleOnPress = () => onAction(value)

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={handleOnPress}
        activeOpacity={0.8}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.texts}>
          <Text style={labelStyle}>{label}</Text>
          {!!extraInfo && <Text style={extraInfoStyle}>{extraInfo}</Text>}
        </View>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.skin200,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 24,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 26,
  },
  label: {
    fontSize: 14,
    color: colors.dark100,
    fontWeight: '500',
  },
  texts: {
    marginLeft: 24,
  },
  extraInfo: {
    color: colors.dark100,
    opacity: 0.75,
  },
  extraInfoActive: {
    color: colors.white,
  },
  whiteText: {
    color: colors.white,
  },
  blueContainer: {
    backgroundColor: colors.dark100,
  },
})
