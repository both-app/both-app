import React, { useContext, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { Icon } from 'library/components/Icon'
import { TabBar } from './components/TabBar'
import { TaskModeModal } from './components/TaskModeModal'

import { HomeScreen } from './screens/Home'
import { RelationScreen } from './screens/Relation'
import { AddTaskNavigator } from './screens/AddTask'
import { LeaderboardScreen } from './screens/Leaderboard'
import { SettingsNavigator } from './screens/Settings'
import { AppNavigatorContext, AppRoute } from './contexts/AppNavigator.context'
import { UsersContext } from './contexts/Users.context'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ROUTES: Record<string, AppRoute> = {
  HOME: 'Home',
  RELATION: 'Relation',
  ADD_TASK: 'AddTask',
  ADD_TASK_MODAL: 'AddTaskModal',
  LEADERBOARD: 'Leaderboard',
  SETTINGS: 'Settings',
}

const MainNavigator = () => {
  const navigation = useNavigation()
  const [taskModeModalIsOpen, setTaskModeModalIsOpen] = useState(false)
  const { appRoutesWithBadge } = useContext(AppNavigatorContext)
  const { partner } = useContext(UsersContext)

  const hasPartner = !!partner.id

  return (
    <>
      <Tab.Navigator initialRouteName={ROUTES.HOME} tabBar={TabBar}>
        <Tab.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{
            tabBarVisible: true,
            tabBarIcon: ({ size, color }) => (
              <Icon
                iconName="home"
                width={size}
                height={size}
                style={{ color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.RELATION}
          component={RelationScreen}
          options={{
            tabBarVisible: true,
            // @ts-ignore
            tabBarBadge: appRoutesWithBadge.Relation,
            tabBarIcon: ({ size, color }) => (
              <Icon
                iconName="users"
                width={size}
                height={size}
                style={{ color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.ADD_TASK}
          component={AddTaskNavigator}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault()

              /**
               * This modal propose to add a task and choose if it's UserTask or a RelationTask
               * But if we don't have a partner, it's useless to propose RelationTask
               */
              if (hasPartner) {
                return setTaskModeModalIsOpen(true)
              }

              return navigation.navigate('AddTaskModal', {
                screen: 'ChooseCategory',
                params: { mode: 'userTask' },
              })
            },
          })}
          options={{
            tabBarVisible: true,
            tabBarIcon: ({ size }) => (
              <Icon
                iconName="plus"
                width={size}
                height={size}
                style={{ color: 'white' }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.LEADERBOARD}
          component={LeaderboardScreen}
          options={{
            tabBarVisible: true,
            tabBarIcon: ({ size, color }) => (
              <Icon
                iconName="award"
                width={size}
                height={size}
                style={{ color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.SETTINGS}
          component={SettingsNavigator}
          options={{
            tabBarVisible: true,
            tabBarIcon: ({ size, color }) => (
              <Icon
                iconName="settings"
                width={size}
                height={size}
                style={{ color }}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <TaskModeModal
        isVisible={taskModeModalIsOpen}
        onClose={() => setTaskModeModalIsOpen(false)}
      />
    </>
  )
}

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Main" headerMode="none" mode="modal">
    <Stack.Screen name="Main" component={MainNavigator} />
    <Stack.Screen name={ROUTES.ADD_TASK_MODAL} component={AddTaskNavigator} />
  </Stack.Navigator>
)
