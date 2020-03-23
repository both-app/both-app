import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RelationScreen } from './RelationScreen'
import { getStackOptions } from '../../../res/stackNavigation'
import { IconButton } from '../../../library/components/IconButton'

const Stack = createStackNavigator()

export const RelationNavigator = () => (
  <Stack.Navigator initialRouteName="Relation">
    <Stack.Screen
      name="Relation"
      component={RelationScreen}
      options={getStackOptions({
        headerRight: () => (
          <IconButton
            iconName="broken_heart"
            width={25}
            height={25}
            fill="white"
          />
        ),
      })}
    />
  </Stack.Navigator>
)
