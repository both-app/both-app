import React, { FC } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import { IconButton } from 'library/components/IconButton'
import { colors } from 'res/colors'

interface ScreenContainerProps {
  onBackAction?: VoidFunction
}

export const ScreenContainer: FC<ScreenContainerProps> = ({
  children,
  onBackAction,
}) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
  >
    <TouchableWithoutFeedback>
      <>
        <IconButton
          iconName="chevron_left"
          style={styles.backButton}
          onAction={onBackAction}
        />

        {children}
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
})
