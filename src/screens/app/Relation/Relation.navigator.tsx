import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RelationScreen } from './RelationScreen'

import { IconButton } from 'library/components/IconButton'
import { getStackOptions } from 'res/stackNavigation'
import { AuthContext } from '../../auth'

const Stack = createStackNavigator()

const ROUTES = {
  RELATION: 'Relation',
}

export const RelationNavigator = () => {
  const { setIsConnected } = useContext(AuthContext)

  const onLogout = () => setIsConnected(false)

  return (
    <Stack.Navigator initialRouteName={ROUTES.RELATION}>
      <Stack.Screen
        name={ROUTES.RELATION}
        component={RelationScreen}
        options={getStackOptions({
          headerRight: () => (
            <IconButton
              iconName="broken_heart"
              width={25}
              fill="white"
              onAction={onLogout}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}
