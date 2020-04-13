import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from '@react-navigation/core'

import { useT } from 'res/i18n'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

import { Task } from './components/Task'
import { TaskAddedModalContext } from '../../Dashboard/components/TaskAddedModal'
import { AddTaskStackParamList } from '../AddTask.navigator'

type ChooseTaskRouteProps = RouteProp<AddTaskStackParamList, 'ChooseTask'>

export const ChooseTaskScreen = () => {
  const { t } = useT()
  const route = useRoute<ChooseTaskRouteProps>()
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { getTasksByCategoryId } = useContext(TaskContext)
  const { addNewUserTask } = useContext(UserTaskContext)
  const { openTaskAddedModal } = useContext(TaskAddedModalContext)

  const { category } = route.params

  useFocusEffect(
    useCallback(() => {
      setSelectedId(null)
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
