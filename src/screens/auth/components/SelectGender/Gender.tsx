import React, { FC, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from 'res/colors'

interface GenderProps {
  icon: string
  label: string
  value: string
  onAction: (value: string) => void
  selected?: boolean
}

export const Gender: FC<GenderProps> = memo(
  ({ icon, label, onAction, value, selected }) => {
    const containerStyle = {
      ...styles.container,
      ...(selected ? styles.blueContainer : {}),
    }

    const labelStyle = {
      ...styles.label,
      ...(selected ? styles.whiteText : {}),
    }

    return (
      <TouchableOpacity style={containerStyle} onPress={() => onAction(value)}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={labelStyle}>{label}</Text>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.beigeDark,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
  icon: {
    fontSize: 48,
  },
  label: {
    fontSize: 14,
    color: colors.blueDark,
    marginTop: 10,
  },
  whiteText: {
    color: 'white',
  },
  blueContainer: {
    backgroundColor: colors.blueDark,
  },
})
