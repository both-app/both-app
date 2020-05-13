import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RModal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { IconButton } from 'library/components/IconButton'
import { CardButton } from 'library/components/CardButton'

interface AddModalProps {
  isVisible: boolean
  onClose: Function
}

export const AddModal: FC<AddModalProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation()

  const handleOnClose = () => onClose()

  return (
    <RModal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={handleOnClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.text}>Que souhaites-tu faire ?</Text>
        <CardButton
          emoji="📦"
          title="Ajouter une tâche existante"
          subtitle="83 tâches disponibles"
          containerStyle={{ marginBottom: 8 }}
          onAction={() => {
            navigation.navigate('AddTaskModal')
            handleOnClose()
          }}
        />
        <CardButton
          emoji="🔮"
          title="Créer une tâche personnalisée"
          subtitle="3 étapes rapides"
          containerStyle={{ marginBottom: 52 }}
          onAction={() => {
            navigation.navigate('CreateTaskModal')
            handleOnClose()
          }}
        />

        <View style={styles.bottom}>
          <IconButton
            iconName="close"
            iconColor="white"
            buttonStyle={styles.closeButton}
            onAction={handleOnClose}
            size={64}
          />
        </View>
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
  modalContainer: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingLeft: 24,
    paddingRight: 24,
  },
  text: {
    marginBottom: 8,
    color: colors.dark200,
  },
  bottom: {
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: colors.dark200,
  },
})
