import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/core'

import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { TaskDifficulty } from './components/TaskDifficulty'
import { TaskAddedModalContext } from '../../Dashboard/components/TaskAddedModal'

export const ChooseTaskDifficultyScreen = () => {
  const { t } = useT()
  const route = useRoute()
  const navigation = useNavigation()
  const [selectedIndex, setSelectedIndex] = useState<number | null>()

  const { addNewUserTask } = useContext(UserTaskContext)
  const { openTaskAddedModal } = useContext(TaskAddedModalContext)

  useFocusEffect(
    useCallback(() => {
      setSelectedIndex(null)
    }, [])
  )

  // @ts-ignore
  const category = route.params.category as Category
  // @ts-ignore
  const task = route.params.task as Task

  const handleOnAction = async (difficultyIndex: number) => {
    setSelectedIndex(difficultyIndex)

    openTaskAddedModal(task, difficultyIndex)
    addNewUserTask(task.id, difficultyIndex)

    navigation.navigate('Dashboard')
  }

  const handleOnBack = () => navigation.goBack()

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      label={
        <Label primary={`${task.name} ${task.emoji}`} secondary="C'était..." />
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
