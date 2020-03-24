import React, { FC, useState, useMemo } from 'react'
import { View, TextInput, StyleSheet, KeyboardType } from 'react-native'
import { colors } from '../../../res/colors'
import { Label } from '../Label'

interface InputProps {
  label: string
  placeholder: string
  keyboardType?: KeyboardType
  isTheLast?: boolean
  onEndEditing: (text: string) => void
  error?: string
}

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  keyboardType,
  isTheLast = false,
  onEndEditing,
  error = '',
}) => {
  const [value, setValue] = useState<string | null>(null)

  const handleOnChangeText = (value) => setValue(value)

  const handleOnEndEditing = () => onEndEditing(value)

  const inputStyle = useMemo(
    () => ({
      ...styles.input,
      ...(value ? styles.activeInput : {}),
      ...(error ? styles.errorInput : {}),
    }),
    [value, error]
  )

  return (
    <View style={isTheLast ? {} : styles.container}>
      <Label>{label}</Label>
      <TextInput
        numberOfLines={1}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={inputStyle}
        onChangeText={handleOnChangeText}
        onEndEditing={handleOnEndEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  input: {
    fontFamily: 'gotham-book',
    fontSize: 15,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  activeInput: {
    borderBottomColor: '#CDCDCD',
    color: '#A3A3A3',
  },
  errorInput: {
    borderBottomColor: colors.pink,
    color: colors.pink,
  },
})
