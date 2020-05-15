import React from 'react'
import { View, StyleSheet } from 'react-native'
import BottomSheetBehavior from 'reanimated-bottom-sheet'
import EmojiSelector from 'react-native-emoji-selector'

import { colors } from 'res/colors'
import RModal from 'react-native-modal'

const MAX_HEIGHT = 400

export const EmojiModal = ({ isVisible, onClose, onEmojiSelected }) => {
  return (
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
}

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