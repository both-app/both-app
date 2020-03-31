import React, { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
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
}) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
  >
    <TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
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
