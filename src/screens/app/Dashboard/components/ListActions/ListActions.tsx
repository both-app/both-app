import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton } from '../../../../../library/components/IconButton'
import { colors } from '../../../../../res/colors'

export const ListActions = () => (
  <View style={styles.container}>
    {/* Left Action */}
    <Text></Text>

    {/* Right Action */}
    <View style={styles.rightActionContainer}>
      <IconButton iconName="trash" width={25} fill="white" />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.greyDark,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightActionContainer: {
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
