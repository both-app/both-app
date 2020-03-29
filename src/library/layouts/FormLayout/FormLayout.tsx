import React, { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { colors } from 'res/colors'
import { IconButton } from 'library/components/IconButton'

interface FormLayoutProps {
  containerStyle: any
  label: ReactNode
  error?: ReactNode
  submit?: ReactNode
  onBackAction?: VoidFunction
  onCloseAction?: VoidFunction
}

export const FormLayout: FC<FormLayoutProps> = ({
  containerStyle,
  label,
  error,
  submit,
  onBackAction,
  onCloseAction,
  children,
}) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
  >
    <TouchableWithoutFeedback>
      <>
        {onBackAction && (
          <IconButton
            iconName="chevron_left"
            onAction={onBackAction}
            iconStyle={styles.iconStyle}
          />
        )}

        {onCloseAction && (
          <IconButton
            iconName="plus"
            onAction={onCloseAction}
            iconStyle={styles.iconStyle}
          />
        )}

        <View style={containerStyle}>
          {label}
          {children}

          {(submit || error) && (
            <View style={styles.bottomContainer}>
              {error}
              <View style={styles.buttonContainer}>{submit}</View>
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
    paddingTop: 80,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.beigeLight,
  },
  backButton: {
    color: colors.blueDark,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomContainer: {
    marginBottom: 32,
  },
  iconStyle: {
    color: colors.blueDark,
  },
})
