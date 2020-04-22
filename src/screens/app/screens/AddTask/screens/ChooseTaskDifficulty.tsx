import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from '@react-navigation/core'

import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { TaskDifficulty } from './components/TaskDifficulty'
import { AddTaskStackParamList } from '../AddTask.navigator'
import { AddTaskContext } from '../AddTask.context'

type ChooseTaskDifficultyRouteProps = RouteProp<
  AddTaskStackParamList,
  'ChooseTaskDifficulty'
>

export const ChooseTaskDifficultyScreen = () => {
  const { t } = useT()
  const route = useRoute<ChooseTaskDifficultyRouteProps>()
  const navigation = useNavigation()
  const [selectedIndex, setSelectedIndex] = useState<number | null>()
  const { addTask } = useContext(AddTaskContext)

  const { category, task } = route.params

  useFocusEffect(
    useCallback(() => {
      setSelectedIndex(null)
    }, [])
  )

  const handleOnAction = async (difficultyIndex: number) => {
    setSelectedIndex(difficultyIndex)
    addTask(task, difficultyIndex)

    navigation.navigate('Dashboard')
  }

  const handleOnBack = () => navigation.goBack()

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      label={
        <Label
          primary={`${task.name} ${task.emoji}`}
          secondary={t('app:screen:newUserTask:chooseTaskDifficulty:subtitle')}
        />
      }
    >
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}
      >
        {task.difficulties.map((taskDifficulty, index) => (
          <TaskDifficulty
            key={index}
            taskDifficulty={taskDifficulty}
            taskDifficultyIndex={index}
            onAction={handleOnAction}
            selectedIndex={selectedIndex}
            color={category.color}
            isFirstItem={index === 0}
            isLastItem={index === task.difficulties.length - 1}
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
