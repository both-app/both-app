import React, { FC, useState, useRef } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { colors } from 'res/colors'

type InputCodeProps = {
  length: number
  value: string
  placeholder: string
  onChange?: (code: string) => void
}

export const InputCode: FC<InputCodeProps> = ({
  value,
  length,
  onChange,
  placeholder,
}) => {
  const textInputCode = useRef()
  const [code, setCode] = useState<string>(value)

  const onPressCode = () => {
    if (textInputCode === null) return

    // @ts-ignore
    textInputCode.current.focus()
  }

  const extract = (index: number, code: string) => {
    return code.length <= index ? '' : code.substr(index, 1)
  }

  const onChangeText = (value: string) => {
    setCode(value)
    onChange(value)
  }

  const renderItem = (index: number) => {
    const value = extract(index, code)

    const textStyle = {
      ...styles.codeText,
      ...(value ? {} : styles.codeTextPlaceholder),
    }

    return (
      <View key={index} style={styles.code}>
        <Text style={textStyle}>{value || extract(index, placeholder)}</Text>
      </View>
    )
  }

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPressCode} activeOpacity={1}>
          <View style={styles.codeContainer}>
            {Array(length)
              .fill(0)
              .map((_, index) => renderItem(index))}
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        ref={textInputCode}
        autoFocus
        caretHidden={true}
        onChangeText={onChangeText}
        maxLength={length}
        autoCapitalize="characters"
        style={styles.input}
        value={code}
      />
    </>
  )
}

const styles = StyleSheet.create({
  codeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  code: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.skin200,
    minWidth: 35,
    borderRadius: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  codeText: {
    fontSize: 28,
    color: colors.dark100,
  },
  codeTextPlaceholder: {
    color: colors.grey100,
  },
  input: {
    fontSize: 0,
    height: 1,
    opacity: 0,
    margin: 0,
    padding: 0,
  },
})
