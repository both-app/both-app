import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'
import { CategoryButton } from '../components/CategoryButton'

export const ChooseCategoryScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const { categories } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)

  const navigation = useNavigation()

  const handleOnAction = (categoryId: string) => {
    setSelectedCategoryId(categoryId)

    setTimeout(() => {
      navigation.navigate('ChooseTask', { categoryId })
    }, 500)
  }

  const handleOnClose = () => {
    setSelectedCategoryId('')
    navigation.navigate('Dashboard')
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onCloseAction={handleOnClose}
      label={<Label primary="Sélectionne..." secondary="Une catégorie 📦" />}
    >
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            tasks={getTasksByCategoryId(category.id)}
            onAction={() => handleOnAction(category.id)}
            active={selectedCategoryId === category.id}
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
  categoriesContainer: {
    marginTop: 72,
  },
})
