import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { Scroll } from 'library/layouts/Scroll'

import { useT } from 'res/i18n'

export const ChooseCategoryScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { categories } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)

  useFocusEffect(
    useCallback(() => {
      setSelectedId(null)
    }, [])
  )

  const handleOnAction = async (category: Category) => {
    setSelectedId(category.id)

    navigation.navigate('ChooseTask', { category })
  }

  const handleOnClose = () => {
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
      <Scroll style={styles.categoriesContainer}>
        {categories.map((category) => {
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
              onAction={() => handleOnAction(category)}
              active={selectedId === category.id}
              activeBackgroundColor={category.color}
              activeTextColor="white"
              containerStyle={{
                marginBottom: 8,
              }}
            />
          )
        })}
      </Scroll>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingTop: 72,
  },
})
