import React, { FC, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { Gender } from './Gender'

interface SelectGenderProps {
  onChange: (value: string) => void
  value: string
}

const GENDERS = [
  { icon: '👩', label: 'Femme', value: 'woman' },
  { icon: '👱‍♂️', label: 'Homme', value: 'man' },
  { icon: '💖', label: 'Autre', value: 'other' },
]

export const SelectGender: FC<SelectGenderProps> = ({ onChange, value }) => {
  const [selectedValue, setValue] = useState(value)

  const handleOnAction = (value: string) => {
    setValue(value)
    onChange(value)
  }

  return (
    <View style={styles.container}>
      {GENDERS.map(({ icon, label, value: genderValue }) => (
        <View style={{ marginBottom: 32 }} key={genderValue}>
          <Gender
            icon={icon}
            label={label}
            value={genderValue}
            onAction={handleOnAction}
            selected={selectedValue === genderValue}
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
