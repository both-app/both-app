import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import EmojiSelector from 'react-native-emoji-selector'
import RModal from 'react-native-modal'

import { colors } from 'res/colors'

const MAX_HEIGHT = 400

interface EmojiModalProps {
  isVisible: boolean
  onClose: () => void
  onEmojiSelected: (emoji: string) => void
}

export const EmojiModal: FC<EmojiModalProps> = ({
  isVisible,
  onClose,
  onEmojiSelected,
}) => (
  <RModal
    isVisible={isVisible}
    style={styles.modal}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    onBackdropPress={onClose}
  >
    <View style={styles.container}>
      <EmojiSelector
        onEmojiSelected={onEmojiSelected}
        theme={colors.dark200}
        showHistory={false}
        showSearchBar={false}
        showSectionTitles={false}
        columns={7}
      />
    </View>
  </RModal>
)

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: colors.skin100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  container: {
    height: MAX_HEIGHT,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
})
