import React, { FC } from 'react'
import {
  Modal as RModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { IconButton } from 'library/components/IconButton'
import { Icon, IconProps } from 'library/components/Icon'

import { colors, lightenDarkenColor } from 'res/colors'

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
  <RModal animationType="fade" transparent visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={{ ...styles.modal, ...styles.modalShadow }}>
        {emoji && <Text style={styles.emoji}>{emoji}</Text>}

        <View style={styles.closeButtonContainer}>
          <IconButton
            iconName="close"
            style={styles.closeButton}
            onAction={onClose}
          />
        </View>

        {children}

        <TouchableOpacity style={styles.primaryButton} onPress={onAction}>
          <Icon
            iconName={primaryActionIconName}
            width={30}
            height={30}
            style={{ color: 'white' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  </RModal>
)

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  modal: {
    backgroundColor: colors.blueDark,
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    borderRadius: 19.2,
    backgroundColor: lightenDarkenColor(colors.blueDark, 20),
  },
})
