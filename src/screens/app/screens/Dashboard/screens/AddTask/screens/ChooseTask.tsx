import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'
import { TaskButton } from '../components/TaskButton'

export const ChooseTaskScreen = () => {
  const [selectedCategory, setCategory] = useState<Category>()

  const { getCategoryById } = useContext(CategoryContext)
  const { getTasksByCategoryId } = useContext(TaskContext)

  const route = useRoute()
  const navigation = useNavigation()

  // @ts-ignore
  const categoryId = route.params?.categoryId || ''

  useEffect(() => {
    const category = getCategoryById(categoryId)

    setCategory(category)
  }, [])

  const handleOnAction = (taskId: string) => {
    setTimeout(() => {
      navigation.navigate('Dashboard')
    }, 500)
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={() => navigation.goBack()}
      label={
        <Label
          primary={`${selectedCategory?.name} ${selectedCategory?.icon}`}
          secondary="Et qu'as tu fait ?"
        />
      }
    >
      <ScrollView style={styles.tasksContainer}>
        {getTasksByCategoryId(categoryId).map((task) => (
          <TaskButton
            key={task.id}
            task={task}
            onAction={() => handleOnAction(task.id)}
          />
        ))}
      </ScrollView>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  tasksContainer: {
    marginTop: 72,
  },
})
