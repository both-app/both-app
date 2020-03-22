import React, { FC, useState, useCallback, useMemo } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardType,
  TextInputProps,
} from 'react-native'
import { colors } from '../../../res/colors'

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
      <Text style={styles.label}>{label}</Text>
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
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    paddingBottom: 10,
    fontSize: 15,
  },
  activeInput: {
    borderBottomColor: '#CDCDCD',
    color: '#A3A3A3',
  },
  errorInput: {
    borderBottomColor: colors.pink,
    color: colors.pink,
  },
  label: {
    marginBottom: 15,
    color: colors.pink,
    fontWeight: 'bold',
    fontSize: 20,
  },
})
