import React, { useContext, FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { Confetti } from 'screens/app/components/Confetti'

interface DrawHeaderProps {
  scoreType: ScoreType
}

export const DrawHeader: FC<DrawHeaderProps> = ({ scoreType }) => {
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)

  return (
    <>
      <Confetti containerStyle={styles.confettiContainer}>
        <View style={styles.avatarsContainer}>
          <Avatar
            containerStyle={{ ...styles.avatar, marginRight: -12 }}
            firstname={me.firstName}
            avatar={me.avatarUrl}
            size="large"
            backgroundColor="dark200"
            avatarColor="white"
            borderColor="dark200"
          />
          <Avatar
            containerStyle={{ ...styles.avatar, marginLeft: -12 }}
            firstname={partner.firstName}
            avatar={partner.avatarUrl}
            size="large"
            backgroundColor="dark200"
            avatarColor="white"
            borderColor="dark200"
          />
        </View>
        <Text style={styles.medal}>🏆</Text>
      </Confetti>
      <Text style={styles.text}>
        {scoreType === 'global'
          ? t('app:screen:leaderboard:winners')
          : t('app:screen:leaderboard:winnersOfTheWeek')}
      </Text>
    </>
  )
}

export const styles = StyleSheet.create({
  text: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.white,
    marginBottom: 8,
  },
  confettiContainer: {
    marginBottom: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  medal: {
    position: 'absolute',
    bottom: -44,
    fontSize: 60,
  },
})
