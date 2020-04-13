import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { CategoryContext } from 'screens/app/contexts/Category.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { wait } from 'res/utils'
import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { Task } from './components/Task'

export const ChooseTaskScreen = () => {
  const { t } = useT()
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

  const handleOnAction = async (taskId: string, difficulty?: number) => {
    setSelectedTaskId(taskId)

    if (!difficulty) {
      addNewUserTask(taskId, 0)

      await wait(200)

      setTaskIdCompleted(taskId)
      navigation.navigate('Dashboard')
    }
  }

  const tasks = getTasksByCategoryId(categoryId)

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={() => navigation.goBack()}
      label={
        <Label
          primary={`${selectedCategory?.name} ${selectedCategory?.emoji}`}
          secondary={t('app:screen:newUserTask:chooseTask:subtitle')}
        />
      }
    >
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            selectedCategory={selectedCategory}
            selectedTaskId={selectedTaskId}
            onAction={handleOnAction}
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
