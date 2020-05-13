import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { CreateTaskStackParamList } from '../CreateTask.navigator'
import { TaskPreview } from '../components/TaskPreview'

type ChoosePointsRouteProps = RouteProp<
  CreateTaskStackParamList,
  'ChoosePoints'
>

const CONFIG_POINTS = [
  {
    emoji: '🎁',
    title: 'Cadeau',
    points: 0,
  },
  {
    emoji: '😎',
    title: 'Très facile',
    points: 1,
  },
  {
    emoji: '😊',
    title: 'Facile',
    points: 2,
  },
  {
    emoji: '😓',
    title: 'Contraignant',
    points: 3,
  },
  {
    emoji: '😣',
    title: 'Difficle',
    points: 4,
  },
  {
    emoji: '😰',
    title: 'Très difficile',
    points: 5,
  },
]

export const ChoosePointsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ChoosePointsRouteProps>()
  const [points, setPoints] = useState<number>(0)

  const { taskName, emoji } = route.params

  const handleOnBack = () => {
    navigation.goBack()
  }

  const handleOnNext = () => {
    navigation.navigate('Home')
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onFinishAction={handleOnNext}
      label={
        <Label primary="Et enfin 🤔" secondary="Le niveau de difficulté..." />
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
            title={config.title}
            rightContent={<Point points={config.points} />}
            onAction={() => setPoints(config.points)}
            containerStyle={{ marginBottom: 8 }}
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
