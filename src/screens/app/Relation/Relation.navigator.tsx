import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RelationScreen } from './RelationScreen'
import { getStackOptions } from '../../../res/stackNavigation'
import { IconButton } from '../../../library/components/IconButton'
import { AuthContext } from '../../auth'

const Stack = createStackNavigator()

export const RelationNavigator = () => {
  const { setIsConnected } = useContext(AuthContext)

  const onLogout = () => setIsConnected(false)

  return (
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
              onAction={onLogout}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}
