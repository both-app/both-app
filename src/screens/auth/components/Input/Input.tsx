import React, { FC } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from 'res/colors'

interface InputProps {
  placeholder: TextInput['props']['placeholder']
  onChangeText: TextInput['props']['onChangeText']
}

export const Input: FC<InputProps> = ({ placeholder, onChangeText }) => (
  <TextInput
    placeholder={placeholder}
    autoFocus
    autoCorrect={false}
    onChangeText={onChangeText}
    placeholderTextColor="#BDBCBD"
    style={styles.input}
  />
)

const styles = StyleSheet.create({
  input: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.dark100,
  },
})
