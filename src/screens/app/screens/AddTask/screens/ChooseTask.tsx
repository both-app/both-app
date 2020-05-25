import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from '@react-navigation/core'

import { useT } from 'res/i18n'
import { colors } from 'res/colors'
import { useStatusBar } from 'hooks/useStatusBar'

import { TaskContext } from 'screens/app/contexts/Task.context'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { CardButton } from 'library/components/CardButton'

import { Task } from './components/Task'
import { AddTaskStackParamList } from '../AddTask.navigator'
import { AddTaskContext } from '../AddTask.context'
import { ROUTES } from '../AddTask.navigator'

type ChooseTaskRouteProps = RouteProp<AddTaskStackParamList, 'ChooseTask'>

export const ChooseTaskScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const route = useRoute<ChooseTaskRouteProps>()
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { getTasksByCategoryId } = useContext(TaskContext)
  const { addTask } = useContext(AddTaskContext)

  const { category, newTaskId } = route.params

  useFocusEffect(
    useCallback(() => {
      setSelectedId(null)
    }, [])
  )

  const handleOnAction = async (task: Task, difficulty: number) => {
    setSelectedId(task.id)

    if (difficulty === 0) {
      addTask(task, difficulty)

      return navigation.navigate('Home')
    }

    return navigation.navigate(ROUTES.CHOOSE_TASK_DIFFICULTY, {
      category,
      task,
    })
  }

  const handleOnCreateTask = () => {
    return navigation.navigate(ROUTES.CREATE_TASK, {
      screen: 'ChooseName',
      params: { category },
    })
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
      <Scroll marginTop={52} marginBottom={24}>
        <CardButton
          emoji="🔮"
          title={t('app:screen:newUserTask:chooseTask:createNewTask:title')}
          subtitle={t(
            'app:screen:newUserTask:chooseTask:createNewTask:subtitle'
          )}
          containerStyle={styles.createNewTaskButton}
          onAction={handleOnCreateTask}
        />

        {tasks.map((task: Task) => (
          <Task
            key={task.id}
            isNew={task.id === newTaskId}
            task={task}
            category={category}
            selectedId={selectedId}
            onAction={handleOnAction}
          />
        ))}
      </Scroll>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  createNewTaskButton: {
    marginBottom: 8,
    borderColor: colors.grey100,
    borderStyle: 'dashed',
    borderWidth: 2,
    backgroundColor: colors.skin200,
  },
})
