import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'

export const ChooseCategoryScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const { categories } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)

  const navigation = useNavigation()

  const handleOnAction = (categoryId: string) => {
    setSelectedCategoryId(categoryId)

    setTimeout(() => {
      navigation.navigate('ChooseTask', { categoryId })
    }, 50)
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
          <CardButton
            key={category.id}
            emoji={category.icon}
            title={category.name}
            subtitle={`${getTasksByCategoryId(category.id).length} tâches`}
            onAction={() => handleOnAction(category.id)}
            active={selectedCategoryId === category.id}
            activeBackgroundColor={category.color}
            activeTextColor="white"
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
