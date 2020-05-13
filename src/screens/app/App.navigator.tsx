import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { Icon } from 'library/components/Icon'
import { TabBar } from './components/TabBar'
import { AddModal } from './components/AddModal'

import { HomeScreen } from './screens/Home'
import { RelationScreen } from './screens/Relation'
import { AddTaskNavigator } from './screens/AddTask'
import { LeaderboardScreen } from './screens/Leaderboard'
import { SettingsNavigator } from './screens/Settings'
import { CreateTaskNavigator } from './screens/CreateTask'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ROUTES = {
  HOME: 'Home',
  RELATION: 'Relation',
  ADD: 'Add',
  ADD_TASK_MODAL: 'AddTaskModal',
  CREATE_TASK_MODAL: 'CreateTaskModal',
  LEADERBOARD: 'Leaderboard',
  SETTINGS: 'Settings',
}

const MainNavigator = () => {
  const [modalIsVisible, setModalIsOpen] = useState(false)

  const toggleModal = () => setModalIsOpen(!modalIsVisible)

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
          name={ROUTES.ADD}
          component={AddTaskNavigator}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault()
              toggleModal()
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

      <AddModal isVisible={modalIsVisible} onClose={toggleModal} />
    </>
  )
}

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Main" headerMode="none" mode="modal">
    <Stack.Screen name="Main" component={MainNavigator} />
    <Stack.Screen name={ROUTES.ADD_TASK_MODAL} component={AddTaskNavigator} />
    <Stack.Screen
      name={ROUTES.CREATE_TASK_MODAL}
      component={CreateTaskNavigator}
    />
  </Stack.Navigator>
)
