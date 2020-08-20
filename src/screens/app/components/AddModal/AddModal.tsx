import React, { FC } from 'react'
import RModal from 'react-native-modal'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { CardButton } from 'library/components/CardButton'
import { IconButton } from 'library/components/IconButton'

import { colors } from 'res/colors'

interface AddModalProps {
  isVisible: boolean
  onClose: () => void
}

export const AddModal: FC<AddModalProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation()

  return (
    <RModal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <CardButton
          emoji="📦"
          title="Ajouter une tâche"
          subtitle="83 tâches disponibles"
          containerStyle={styles.addTaskButton}
          onAction={() => {
            navigation.navigate('AddTaskModal', {
              screen: 'ChooseCategory',
              params: { addRelationTask: false },
            })
            onClose()
          }}
        />
        <CardButton
          emoji="👋"
          title="Demander de l'aide à ton partenaire"
          subtitle="3 étapes rapides"
          onAction={() => {
            navigation.navigate('AddTaskModal', {
              screen: 'ChooseCategory',
              params: { addRelationTask: true },
            })
            onClose()
          }}
        />

        <IconButton
          size={64}
          iconName="close"
          onAction={onClose}
          iconColor="white"
          buttonStyle={styles.closeButton}
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
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.skin100,
    alignItems: 'center',
  },
  addTaskButton: {
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 40,
    backgroundColor: colors.dark200,
    marginBottom: 32,
  },
})
