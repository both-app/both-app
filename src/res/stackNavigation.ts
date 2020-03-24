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
    fontFamily: 'gotham-medium',
    color: 'white',
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    marginRight: 20,
  },
})

const stackHeaderOptions: StackHeaderOptions = {
  headerStyle: styles.headerContainer,
  headerTitleStyle: styles.headerTitle,
  headerLeftContainerStyle: styles.headerLeft,
  headerRightContainerStyle: styles.headerRight,
  headerBackTitleVisible: false,
  headerTintColor: 'white',
}

export const getStackOptions = (options?: StackNavigationOptions) => ({
  ...stackHeaderOptions,
  ...options,
})
