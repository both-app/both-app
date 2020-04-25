import React, { FC, ReactNode, useCallback } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { MinimalButton } from 'library/components/MinimalButton'
import { IconButton } from 'library/components/IconButton'

import { colors } from 'res/colors'

interface FormLayoutProps {
  containerStyle: any
  label: ReactNode
  bottomInfo?: ReactNode
  onBackAction?: VoidFunction
  onCloseAction?: VoidFunction
  onNextAction?: VoidFunction
  onFinishAction?: VoidFunction
  testID?: string
}

export const FormLayout: FC<FormLayoutProps> = ({
  containerStyle,
  label,
  bottomInfo,
  onBackAction,
  onCloseAction,
  onFinishAction,
  onNextAction,
  children,
  testID,
}) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const formContainerStyle = Platform.select({
    ios: {
      paddingTop: 55,
      ...styles.container,
    },
    android: {
      paddingTop: 40,
      ...styles.container,
    },
  })

  return (
    <KeyboardAvoidingView
      style={formContainerStyle}
      testID={testID}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback>
        <>
          {Platform.OS == 'ios' && (
            <>
              {onBackAction && (
                <MinimalButton
                  iconName="chevron_left"
                  onAction={onBackAction}
                  iconColor="dark100"
                />
              )}

              {onCloseAction && (
                <MinimalButton
                  iconName="close"
                  onAction={onCloseAction}
                  iconColor="dark100"
                />
              )}
            </>
          )}

          <View style={{ marginTop: 24, ...containerStyle }}>
            {label}
            {children}

            {(onNextAction || onFinishAction || bottomInfo) && (
              <View style={styles.bottomContainer}>
                {bottomInfo}
                <View style={styles.buttonContainer}>
                  {onNextAction && (
                    <IconButton
                      iconName="arrow_right"
                      onAction={onNextAction}
                      size={64}
                      buttonColor="dark100"
                      iconColor="white"
                    />
                  )}

                  {onFinishAction && (
                    <IconButton
                      iconName="check"
                      onAction={onFinishAction}
                      size={64}
                      buttonColor="dark100"
                      iconColor="white"
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomContainer: {
    marginBottom: 32,
  },
})
