import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/core'
import * as Haptics from 'expo-haptics'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { useStatusBar } from 'hooks/useStatusBar'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { CreateTaskStackParamList } from '../CreateTask.navigator'
import { TaskPreview } from '../components/TaskPreview'
import { CreateTaskContext } from '../CreateTask.context'

type ChooseDifficultiesRouteProps = RouteProp<
  CreateTaskStackParamList,
  'ChooseDifficulties'
>

const CONFIG_POINTS = [
  {
    emoji: '🎁',
    points: 0,
  },
  {
    emoji: '😎',
    points: 1,
  },
  {
    emoji: '😊',
    points: 2,
  },
  {
    emoji: '😓',
    points: 3,
  },
  {
    emoji: '😣',
    points: 4,
  },
  {
    emoji: '😰',
    points: 5,
  },
]

export const ChooseDifficultiesScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const navigation = useNavigation()
  const route = useRoute<ChooseDifficultiesRouteProps>()
  const [selectedIndexs, setSelectedIndexs] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [difficulties, setDifficulties] = useState<TaskDifficulty[]>([])
  const { createTask } = useContext(CreateTaskContext)

  const { taskName, emoji, category } = route.params

  const handleOnBack = () => {
    navigation.goBack()
  }

  const handleOnFinish = async () => {
    if (difficulties.length <= 0) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const task = await createTask({
      emoji,
      name: taskName,
      difficulties,
      categoryId: category.id,
    })

    /**
     * The params newTaskId is use to display a badge (New) on the task
     */
    navigation.navigate('AddTaskModal', {
      screen: 'ChooseTask',
      params: { category, newTaskId: task.id },
    })
  }

  const handleOnAction = (index: number) => {
    const config = CONFIG_POINTS[index]

    // Remove
    if (selectedIndexs.includes(index)) {
      const newSelectedIndexs = selectedIndexs.filter(
        (selectedIndex) => selectedIndex !== index
      )
      const newDifficulties = difficulties.filter(
        (taskDifficulty) => taskDifficulty.points !== config.points
      )

      setSelectedIndexs(newSelectedIndexs)
      setDifficulties(newDifficulties)
    }

    // Add
    if (!selectedIndexs.includes(index)) {
      const newSelectedIndexs = [...selectedIndexs, index]
      const newDifficulties = [...difficulties, { ...config, name: '' }]

      setSelectedIndexs(newSelectedIndexs)
      setDifficulties(newDifficulties)
    }
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onFinishAction={handleOnFinish}
      label={
        <Label
          primary={t('app:screen:createTask:chooseDifficulties:title')}
          secondary={t('app:screen:createTask:chooseDifficulties:subtitle')}
        />
      }
      bottomInfo={
        <TaskPreview
          emoji={emoji}
          name={taskName}
          difficulties={difficulties}
        />
      }
    >
      <Scroll marginTop={52} marginBottom={24}>
        {CONFIG_POINTS.map((config, index) => (
          <CardButton
            key={index}
            emoji={config.emoji}
            title={t(`app:difficulty:${config.points}`)}
            rightContent={<Point points={config.points} />}
            onAction={() => handleOnAction(index)}
            containerStyle={{ marginBottom: 8 }}
            activeBackgroundColor={colors.dark200}
            activeTextColor={colors.white}
            active={selectedIndexs.includes(index)}
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
})
