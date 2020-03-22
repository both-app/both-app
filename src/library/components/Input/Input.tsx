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
  onEndEditing: TextInputProps['onEndEditing']
}

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  keyboardType,
  isTheLast = false,
  onEndEditing,
}) => {
  const [value, setValue] = useState<string | null>(null)

  const handleOnChangeText = useCallback(setValue, [])

  const inputStyle = useMemo(() => {
    if (!value) {
      return styles.input
    }

    return { ...styles.input, ...styles.activeInput }
  }, [value])

  return (
    <View style={isTheLast ? {} : styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        numberOfLines={1}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={inputStyle}
        onChangeText={handleOnChangeText}
        onEndEditing={onEndEditing}
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
  label: {
    marginBottom: 15,
    color: colors.pink,
    fontWeight: 'bold',
    fontSize: 20,
  },
})
