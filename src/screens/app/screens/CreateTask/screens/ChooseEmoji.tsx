import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/core'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

import { EmojiModal } from 'screens/app/components/EmojiModal'

import { CreateTaskStackParamList } from '../CreateTask.navigator'
import { TaskPreview } from '../components/TaskPreview'
import { ROUTES } from '../CreateTask.navigator'

type ChooseEmojiRouteProps = RouteProp<CreateTaskStackParamList, 'ChooseEmoji'>

const EMOJIS = ['🌱', '👅', '🐱', '🐶']

const getRandomNumber = () => {
  return Math.floor(Math.random() * EMOJIS.length)
}

export const ChooseEmojiScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const route = useRoute<ChooseEmojiRouteProps>()
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
  const [selectedEmoji, setEmoji] = useState<string>(EMOJIS[getRandomNumber()])

  const { taskName, category } = route.params

  const handleEmojiSelected = (emoji: string) => {
    setEmoji(emoji)
    setModalIsVisible(false)
  }

  const handleOnBack = () => {
    navigation.goBack()
  }

  const handleOnNext = () => {
    navigation.navigate(ROUTES.CHOOSE_DIFFICULTIES, {
      category,
      taskName,
      emoji: selectedEmoji,
    })
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      label={
        <Label
          primary={t('app:screen:createTask:chooseEmoji:title')}
          secondary={t('app:screen:createTask:chooseEmoji:subtitle')}
        />
      }
      bottomInfo={
        <TaskPreview
          emoji={selectedEmoji}
          taskName={taskName}
          difficulties={[]}
        />
      }
    >
      <TouchableOpacity
        onPress={() => setModalIsVisible(true)}
        activeOpacity={1}
      >
        <View style={styles.selectedEmoji}>
          <Text style={styles.emoji}>{selectedEmoji}</Text>
        </View>
      </TouchableOpacity>

      <EmojiModal
        isVisible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        onEmojiSelected={handleEmojiSelected}
      />
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selectedEmoji: {
    width: 108,
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.skin200,
    borderRadius: 19.2,
    marginTop: 52,
  },
  emoji: {
    fontSize: 60,
  },
})
