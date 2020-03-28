import React, { FC, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface FormContainerProps {
  containerStyle: any
  label: ReactNode
  field: ReactNode
  error: ReactNode
  submit: ReactNode
}

export const FormContainer: FC<FormContainerProps> = ({
  containerStyle,
  label,
  field,
  error,
  submit,
}) => (
  <View style={containerStyle}>
    {label}
    {field}
    <View style={styles.bottomContainer}>
      {error}
      <View style={styles.buttonContainer}>{submit}</View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomContainer: {
    marginBottom: 32,
  },
})
