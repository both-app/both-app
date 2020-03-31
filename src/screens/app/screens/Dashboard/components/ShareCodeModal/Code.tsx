import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

import Enveloppes from '../../../../../../../assets/enveloppes.svg'

interface CodeProps {
  code: string
}

export const Code: FC<CodeProps> = ({ code }) => (
  <View style={styles.codeContainer}>
    <View style={{ ...styles.shape, ...styles.shapeShadow }}>
      <Text style={styles.code}>{code.split('').join(' ')}</Text>
    </View>

    <Enveloppes fill="white" style={{ position: 'absolute' }} />
  </View>
)

const styles = StyleSheet.create({
  codeContainer: {
    height: 217,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape: {
    borderRadius: 24.6,
    backgroundColor: colors.dark200,
    zIndex: 100,
    paddingTop: 8,
    paddingRight: 24,
    paddingBottom: 8,
    paddingLeft: 24,
  },
  shapeShadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  code: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 48,
    color: 'white',
  },
})
