import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'

export const ChooseTaskScreen = () => {
  const [selectedCategory, setCategory] = useState<Category>()
  const [selectedTaskId, setSelectedTaskId] = useState('')

  const { getCategoryById } = useContext(CategoryContext)
  const { getTasksByCategoryId, setTaskIdCompleted } = useContext(TaskContext)

  const route = useRoute()
  const navigation = useNavigation()

  // @ts-ignore
  const categoryId = route.params?.categoryId || ''

  useEffect(() => {
    const category = getCategoryById(categoryId)

    setCategory(category)
  }, [])

  const handleOnAction = (taskId: string) => {
    setSelectedTaskId(taskId)

    setTimeout(() => {
      setTaskIdCompleted(taskId)
      navigation.navigate('Dashboard')
    }, 150)
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
          <CardButton
            key={task.id}
            emoji={task.icon}
            title={task.name}
            onAction={() => handleOnAction(task.id)}
            activeBackgroundColor={selectedCategory?.color}
            activeTextColor="white"
            points={task.points}
            active={selectedTaskId === task.id}
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
