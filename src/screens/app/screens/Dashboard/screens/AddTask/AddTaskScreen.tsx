import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'
import { CategoryButton } from './CategoryButton'

export const AddTaskScreen = () => {
  const { categories } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)
  const navigation = useNavigation()

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onCloseAction={() => navigation.goBack()}
      label={<Label primary="Sélectionne..." secondary="Une catégorie 📦" />}
    >
      <View style={styles.taskTypesContainer}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            tasks={getTasksByCategoryId(category.id)}
          />
        ))}
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
