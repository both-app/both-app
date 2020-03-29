import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

export const AddTaskScreen = () => {
  const navigation = useNavigation()

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onCloseAction={() => navigation.goBack()}
      label={<Label primary="Sélectionne..." secondary="Une catégorie 📦" />}
    >
      <View style={styles.taskTypesContainer}>
        <Text>Categories</Text>
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  taskTypesContainer: {
    marginTop: 72,
  },
})
