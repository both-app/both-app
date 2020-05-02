import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RModal from 'react-native-modal'

import { colors, lightenDarkenColor } from 'res/colors'

import { MinimalButton } from 'library/components/MinimalButton'
import { IconProps } from 'library/components/Icon'

import { IconButton } from '../IconButton'

interface ModalProps {
  visible: boolean
  emoji?: string
  onClose: VoidFunction
  onAction: VoidFunction
  primaryActionIconName: IconProps['iconName']
}

export const Modal: FC<ModalProps> = ({
  visible,
  emoji,
  primaryActionIconName,
  children,
  onClose,
  onAction,
}) => (
  <RModal
    animationIn="fadeIn"
    animationOut="fadeOut"
    backdropOpacity={0.6}
    isVisible={visible}
    onBackdropPress={onClose}
  >
    <View style={{ ...styles.modal, ...styles.modalShadow }}>
      {!!emoji && <Text style={styles.emoji}>{emoji}</Text>}

      <View style={styles.closeButtonContainer}>
        <MinimalButton
          iconName="close"
          style={styles.closeButton}
          onAction={onClose}
        />
      </View>

      {children}

      <IconButton
        iconName={primaryActionIconName}
        iconColor="white"
        buttonStyle={styles.primaryButton}
        onAction={onAction}
        size={64}
      />
    </View>
  </RModal>
)

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.dark100,
    borderRadius: 19.2,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  modalShadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  emoji: {
    position: 'absolute',
    fontSize: 60,
    top: -33,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  closeButton: {
    color: '#607788',
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: lightenDarkenColor(colors.dark100, 20),
  },
})
