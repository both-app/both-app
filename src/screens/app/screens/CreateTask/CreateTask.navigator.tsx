import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseNameScreen } from './screens/ChooseName'
import { ChooseEmojiScreen } from './screens/ChooseEmoji'
import { ChoosePointsScreen } from './screens/ChoosePoints'
import { CreateTaskContextProvider } from './CreateTask.context'

export const ROUTES = {
  CHOOSE_NAME: 'ChooseName',
  CHOOSE_EMOJI: 'ChooseEmoji',
  CHOOSE_POINTS: 'ChoosePoints',
}

export const initialRoute = ROUTES.CHOOSE_NAME

export type CreateTaskStackParamList = {
  ChooseName: undefined
  ChooseEmoji: {
    taskName: string
  }
  ChoosePoints: {
    taskName: string
    emoji: string
  }
}

export const CreateTaskStack = createStackNavigator()

export const CreateTaskNavigator = () => (
  <CreateTaskContextProvider>
    <CreateTaskStack.Navigator
      headerMode="none"
      initialRouteName={initialRoute}
    >
      <CreateTaskStack.Screen
        component={ChooseNameScreen}
        name={ROUTES.CHOOSE_NAME}
      />
      <CreateTaskStack.Screen
        component={ChooseEmojiScreen}
        name={ROUTES.CHOOSE_EMOJI}
      />
      <CreateTaskStack.Screen
        component={ChoosePointsScreen}
        name={ROUTES.CHOOSE_POINTS}
      />
    </CreateTaskStack.Navigator>
  </CreateTaskContextProvider>
)
