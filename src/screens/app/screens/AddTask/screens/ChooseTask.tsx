import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { wait } from 'res/utils'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

export const ChooseTaskScreen = () => {
  const [selectedCategory, setCategory] = useState<Category>()
  const [selectedTaskId, setSelectedTaskId] = useState('')

  const { getCategoryById } = useContext(CategoryContext)
  const { getTasksByCategoryId, setTaskIdCompleted } = useContext(TaskContext)
  const { addNewUserTask } = useContext(UserTaskContext)

  const route = useRoute()
  const navigation = useNavigation()

  // @ts-ignore
  const categoryId = route.params?.categoryId || ''

  useEffect(() => {
    const category = getCategoryById(categoryId)

    setCategory(category)
  }, [])

  const handleOnAction = async (taskId: string) => {
    setSelectedTaskId(taskId)

    addNewUserTask(taskId)

    await wait(200)

    setTaskIdCompleted(taskId)
    navigation.navigate('Dashboard')
  }

  const tasks = getTasksByCategoryId(categoryId)

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={() => navigation.goBack()}
      label={
        <Label
          primary={`${selectedCategory?.name} ${selectedCategory?.emoji}`}
          secondary="Et qu'as tu fait ?"
        />
      }
    >
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task, index) => (
          <CardButton
            key={task.id}
            emoji={task.emoji}
            title={task.name}
            onAction={() => handleOnAction(task.id)}
            activeBackgroundColor={selectedCategory?.color}
            activeTextColor="white"
            points={task.points}
            active={selectedTaskId === task.id}
            containerStyle={{
              marginTop: index === 0 ? 72 : 10,
              marginBottom: index === tasks.length - 1 ? 56 : 0,
            }}
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
    marginTop: 8,
  },
})
