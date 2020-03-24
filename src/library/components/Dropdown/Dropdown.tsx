import React, { FC } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { StyleSheet, View } from 'react-native'
import { Label } from '../Label'

interface DropdownProps {
  label: string
  placeholder: string
}

export const Dropdown: FC<DropdownProps> = ({ label, placeholder }) => (
  <View style={styles.container}>
    <Label>{label}</Label>
    <RNPickerSelect
      onValueChange={console.log}
      placeholder={{ label: placeholder }}
      style={{
        placeholder: styles.input,
        inputIOS: styles.input,
      }}
      items={[
        { label: 'Homme', value: 'h' },
        { label: 'Femme', value: 'f' },
        { label: 'Non binaire', value: 'nb' },
      ]}
    ></RNPickerSelect>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    fontSize: 15,
    borderBottomColor: '#EBEBEB',
  },
  input: {
    fontFamily: 'gotham-book',
    fontSize: 15,
  },
  activeInput: {
    borderBottomColor: '#CDCDCD',
    color: '#A3A3A3',
  },
})
