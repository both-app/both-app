import React, { useContext, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'

import { wait } from 'res/utils'
import { useT } from 'res/i18n'

export const ChooseCategoryScreen = () => {
  const { t } = useT()
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const { categories } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)

  const navigation = useNavigation()

  const handleOnAction = async (categoryId: string) => {
    setSelectedCategoryId(categoryId)

    await wait(50)

    navigation.navigate('ChooseTask', { categoryId })
    setSelectedCategoryId('')
  }

  const handleOnClose = () => {
    setSelectedCategoryId('')
    navigation.navigate('Dashboard')
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onCloseAction={handleOnClose}
      label={
        <Label
          primary={t('app:screen:newUserTask:chooseCategory:title')}
          secondary={t('app:screen:newUserTask:chooseCategory:subtitle')}
        />
      }
    >
      <ScrollView
        style={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => {
          const taskNumber = getTasksByCategoryId(category.id).length

          return (
            <CardButton
              key={category.id}
              emoji={category.emoji}
              title={category.name}
              subtitle={t('app:screen:newUserTask:category:taskNumber', {
                count: taskNumber,
                tasks: taskNumber,
              })}
              onAction={() => handleOnAction(category.id)}
              active={selectedCategoryId === category.id}
              activeBackgroundColor={category.color}
              activeTextColor="white"
              containerStyle={{
                marginTop: index === 0 ? 72 : 10,
                marginBottom: index === categories.length - 1 ? 56 : 0,
              }}
            />
          )
        })}
      </ScrollView>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  categoriesContainer: {
    marginTop: 8,
  },
})
