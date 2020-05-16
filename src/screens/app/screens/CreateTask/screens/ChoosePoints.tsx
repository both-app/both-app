import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/core'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { CreateTaskStackParamList } from '../CreateTask.navigator'
import { TaskPreview } from '../components/TaskPreview'
import { CreateTaskContext } from '../CreateTask.context'

type ChoosePointsRouteProps = RouteProp<
  CreateTaskStackParamList,
  'ChoosePoints'
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

export const ChoosePointsScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const route = useRoute<ChoosePointsRouteProps>()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [points, setPoints] = useState<number>(0)
  const { createTask } = useContext(CreateTaskContext)

  const { taskName, emoji, categoryId } = route.params

  const handleOnBack = () => {
    navigation.goBack()
  }

  const handleOnFinish = async () => {
    await createTask({ emoji, name: taskName, points, categoryId })
    navigation.navigate('Home')
  }

  const handleOnAction = (index: number, points: number) => {
    setSelectedIndex(index)
    setPoints(points)
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onFinishAction={handleOnFinish}
      label={
        <Label
          primary={t('app:screen:createTask:choosePoints:title')}
          secondary={t('app:screen:createTask:choosePoints:subtitle')}
        />
      }
      bottomInfo={
        <TaskPreview emoji={emoji} taskName={taskName} points={points} />
      }
    >
      <Scroll marginTop={52} marginBottom={24}>
        {CONFIG_POINTS.map((config, index) => (
          <CardButton
            key={index}
            emoji={config.emoji}
            title={t(`app:difficulty:${config.points}`)}
            rightContent={<Point points={config.points} />}
            onAction={() => handleOnAction(index, config.points)}
            containerStyle={{ marginBottom: 8 }}
            activeBackgroundColor={colors.dark200}
            activeTextColor={colors.white}
            active={index === selectedIndex}
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
