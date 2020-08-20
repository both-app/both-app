import React, { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native'

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
}) => (
  <SafeAreaView style={styles.safeView}>
    <KeyboardAvoidingView
      style={styles.container}
      testID={testID}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {Platform.OS == 'ios' && (
            <View style={{ paddingLeft: 24 }}>
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
            </View>
          )}

          <View style={{ marginTop: 24, ...containerStyle }}>
            {label}

            <View
              style={{
                flex: 1,
                width: '100%',
                paddingHorizontal: 24,
                marginBottom: 12,
              }}
            >
              {children}
            </View>

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
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.skin100,
  },
  container: {
    flex: 1,
    paddingTop: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomContainer: {
    width: '100%',
    overflow: 'hidden',
    bottom: 12,
  },
})
