import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RecapScreen } from './screens/Recap'
import { AddRelationTaskContextProvider } from './AddRelationTask.context'

export const ROUTES = {
  RECAP: 'Recap',
}

export const initialRoute = ROUTES.RECAP

export type AddRelationTaskStackParamList = {
  Recap: {
    task: Task
  }
}

export const AddRelationTaskStack = createStackNavigator()

export const AddRelationTaskNavigator = () => (
  <AddRelationTaskContextProvider>
    <AddRelationTaskStack.Navigator
      headerMode="none"
      initialRouteName={initialRoute}
    >
      <AddRelationTaskStack.Screen
        component={RecapScreen}
        name={ROUTES.RECAP}
      />
    </AddRelationTaskStack.Navigator>
  </AddRelationTaskContextProvider>
)
