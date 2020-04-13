import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/core'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

import { Task } from './components/Task'
import { TaskAddedModalContext } from '../../Dashboard/components/TaskAddedModal'

export const ChooseTaskScreen = () => {
  const { t } = useT()
  const route = useRoute()
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState('')

  const { getTasksByCategoryId } = useContext(TaskContext)
  const { addNewUserTask } = useContext(UserTaskContext)
  const { openTaskAddedModal } = useContext(TaskAddedModalContext)

  // @ts-ignore
  const category = route.params.category as Category

  useFocusEffect(
    useCallback(() => {
      setSelectedId('')
    }, [])
  )

  const handleOnAction = async (task: Task, difficulty?: number) => {
    setSelectedId(task.id)

    if (difficulty === 0) {
      openTaskAddedModal(task, 0)
      addNewUserTask(task.id, 0)

      return navigation.navigate('Dashboard')
    }

    return navigation.navigate('ChooseTaskDifficulty', { category, task })
  }

  const handleOnBack = () => navigation.goBack()

  const tasks = getTasksByCategoryId(category.id)

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      label={
        <Label
          primary={`${category.name} ${category.emoji}`}
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
            category={category}
            selectedId={selectedId}
            onAction={handleOnAction}
            isFirstItem={index === 0}
            isLastItem={index === tasks.length - 1}
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
