import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { Option } from './Option'

interface SelectProps {
  onChange: (value: string) => void
  value: string
  options: Array<{
    emoji: string
    label: string
    extraInfo?: string
    value: string
  }>
}

export const Select: FC<SelectProps> = ({ onChange, value, options }) => {
  const [selectedValue, setValue] = useState(value)

  const handleOnAction = (value: string) => {
    setValue(value)
    onChange(value)
  }

  return (
    <View style={styles.container}>
      {options.map(({ emoji, label, value: optionValue, extraInfo }) => (
        <View style={{ marginBottom: 16 }} key={optionValue}>
          <Option
            emoji={emoji}
            label={label}
            value={optionValue}
            extraInfo={extraInfo}
            onAction={handleOnAction}
            selected={selectedValue === optionValue}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 72,
  },
})
