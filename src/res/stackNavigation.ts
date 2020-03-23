import { StyleSheet } from 'react-native'
import {
  StackHeaderOptions,
  StackNavigationOptions,
} from '@react-navigation/stack/lib/typescript/src/types'
import { colors } from './colors'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.pink,
  },
  headerTitle: {
    color: 'white',
  },
  headerLeft: {
    marginLeft: 10,
  },
})

const stackHeaderOptions: StackHeaderOptions = {
  headerStyle: styles.headerContainer,
  headerTitleStyle: styles.headerTitle,
  headerLeftContainerStyle: styles.headerLeft,
  headerBackTitleVisible: false,
  headerTintColor: 'white',
}

export const getStackOptions = (options?: StackNavigationOptions) => ({
  ...stackHeaderOptions,
  ...options,
})
