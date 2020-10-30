import React, { FC, useContext } from 'react'
import RModal from 'react-native-modal'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { CardButton } from 'library/components/CardButton'
import { IconButton } from 'library/components/IconButton'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

interface TaskModeModalProps {
  isVisible: boolean
  onClose: () => void
}

export const TaskModeModal: FC<TaskModeModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { t } = useT()
  const navigation = useNavigation()
  const { tasks } = useContext(TaskContext)
  const { partner } = useContext(UsersContext)

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
          title={t('modal:taskMode:button:addTask:title')}
          subtitle={t('modal:taskMode:button:addTask:subtitle', {
            count: tasks.length,
            tasks: tasks.length,
          })}
          containerStyle={styles.addTaskButton}
          onAction={() => {
            // Close first the modal and after open the screen
            onClose()
            navigation.navigate('AddTaskModal', {
              screen: 'ChooseCategory',
              params: { mode: 'userTask' },
            })
          }}
        />
        {!!partner.id && (
          <CardButton
            emoji="👋"
            title={t('modal:taskMode:button:askHelp:title')}
            subtitle={t('modal:taskMode:button:askHelp:subtitle')}
            onAction={() => {
              // Close first the modal and after open the screen
              onClose()
              navigation.navigate('AddTaskModal', {
                screen: 'ChooseCategory',
                params: { mode: 'relationTask' },
              })
            }}
          />
        )}

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
    borderTopLeftRadius: 19.2,
    borderTopRightRadius: 19.2,
    flex: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  container: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderTopLeftRadius: 19.2,
    borderTopRightRadius: 19.2,
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
