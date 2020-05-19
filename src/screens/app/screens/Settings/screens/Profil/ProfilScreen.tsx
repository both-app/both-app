import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Layout } from 'library/layouts/Layout'
import { Avatar } from 'library/components/Avatar'
import { IconButton } from 'library/components/IconButton'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { Info } from 'library/components/Info'
import { colors } from 'res/colors'
import { Value } from '../../components'

export const ProfilScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()

  return (
    <Layout
      header={
        <View style={{ marginBottom: 74 }}>
          <Label primary="Infos. personnelles" color="white" />
        </View>
      }
      centerTopPosition={-60}
      center={
        <View>
          <Avatar
            firstname="M"
            avatarColor="skin100"
            backgroundColor="dark200"
            size="large"
            borderColor="skin100"
            borderWidth={4}
          />

          <IconButton
            iconName="camera"
            onAction={console.log}
            iconColor="white"
            buttonColor="highlight100"
            size={32}
            radius={12}
            iconSize={16}
            buttonStyle={styles.takePictureButton}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Scroll
          style={{ flex: 1, paddingHorizontal: 24 }}
          marginTop={32}
          marginBottom={32}
        >
          <Info
            primary="👋 Salut Mathieu"
            secondary="Ici tu peux ajouter une photo en guise d’avatar ou bien voir les informations personnelles te concernant"
            color="dark200"
          />

          <View style={styles.securityBlock}>
            <Text style={styles.lock}>🔒</Text>
            <Info
              primary="Tes données sont en sécurité"
              secondary="Ne t’inquiètes pas pour ça, on les conserve bien au chaud et ça ne sortira pas de chez nous !"
              color="dark200"
            />
          </View>

          <Value label="Prénom" value="Mathieu" marginBottom={16} />
          <Value label="Genre" value="Homme" />
        </Scroll>
        <View style={styles.bottomContainer}>
          <IconButton
            iconName="chevron_left"
            onAction={() => navigation.goBack()}
            iconColor="white"
            buttonColor="dark200"
            size={64}
          />
        </View>
      </View>
    </Layout>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  takePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  securityBlock: {
    backgroundColor: colors.skin200,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  lock: {
    fontSize: 60,
    marginBottom: 8,
  },
})
