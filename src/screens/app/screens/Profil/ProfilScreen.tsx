import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'

import { Avatar } from 'library/components/Avatar'
import { Info } from 'library/components/Info'
import { Icon } from 'library/components/Icon'
import { CardButton } from 'library/components/CardButton'
import { MinimalButton } from 'library/components/MinimalButton'

export const ProfilScreen = () => {
  const navigation = useNavigation()

  const handleFeedback = async () => {
    await WebBrowser.openBrowserAsync('https://payfit.com')
  }

  const handleOnChangeAvatar = () => {
    alert('Change avatar')
  }

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <MinimalButton
          iconName="close"
          iconColor="dark200"
          onAction={() => navigation.navigate('Dashboard')}
        />
      </View>

      <Avatar
        size="medium"
        onAction={handleOnChangeAvatar}
        backgroundColor="dark200"
      >
        <Icon
          iconName="camera"
          width={32}
          height={32}
          style={{ color: colors.white }}
        />
      </Avatar>

      <Text style={styles.firstname}>Mathieu</Text>

      <Info
        color="dark200"
        primary="✨ 12 jours de relation"
        secondary="On est vraiment heureux et touché que tu partages une partie de ton quotidien avec Both"
      />

      <View style={styles.links}>
        <CardButton
          emoji="⚙️"
          title="Paramètres"
          subtitle="Les trucs qu’on ne savait pas où ranger"
          withHapticFeedback
        />
        <CardButton
          emoji="💔"
          title="Mettre fin à la relation"
          subtitle="C’est fini avec Charlotte..?"
          withHapticFeedback
        />
        <CardButton
          emoji="👪"
          title="Le trio derrière l’app Both"
          subtitle="Coucou c’est nous !"
          withHapticFeedback
        />
        <CardButton
          emoji="💡"
          title="Partager des idées d’amélioration"
          subtitle="Nouvelle catégorie ou fonctionnalité"
          onAction={handleFeedback}
          withHapticFeedback
        />
        <CardButton
          emoji="⭐️"
          title="Donner 5 étoiles sur le store"
          subtitle="Ça nous ferait vraiment plaisir"
          withHapticFeedback
        />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
  },
  firstname: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.dark200,
    marginTop: 16,
    marginBottom: 24,
  },
  links: {
    width: '100%',
    marginTop: 72,
  },
})
