import React, { FC } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Icon } from '../../../../../library/components/Icon'
import { colors } from '../../../../../res/colors'

interface CounterProps {
  count: number
}

export const Counter: FC<CounterProps> = ({ count }) => {
  // TODO To clean
  const getCounterColor = () => {
    let color = colors.green

    if (count < 0) {
      color = colors.yellow
    }

    if (count < -1) {
      color = colors.pink
    }

    return color
  }

  return (
    <View style={{ ...styles.container, backgroundColor: getCounterColor() }}>
      <Text style={styles.text}>{count}</Text>

      <View style={styles.iconPosition}>
        <TouchableOpacity>
          <Icon iconName="add_circle" width={20} fill={colors.greyDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.iconBackground} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    fontFamily: 'gotham-medium',
    fontWeight: 'bold',
    color: colors.greyDark,
  },
  iconPosition: {
    position: 'absolute',
    right: -15,
    zIndex: 1,
  },
  iconBackground: {
    position: 'absolute',
    right: -19,
    width: 28,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 28,
    zIndex: 0,
  },
})
