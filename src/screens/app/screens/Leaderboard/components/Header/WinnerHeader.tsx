import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useT } from 'res/i18n'
import { Confetti } from 'screens/app/components/Confetti'
import { Avatar } from 'library/components/Avatar'
import { RelationStatus } from 'screens/app/components/RelationStatus'
import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

type WinnerHeaderProps = {
  firstName: string
  gender: string
}

export const WinnerHeader: FC<WinnerHeaderProps> = ({ firstName, gender }) => {
  const { t } = useT()

  return (
    <>
      <Confetti containerStyle={styles.confettiContainer}>
        <>
          <Avatar
            firstname={firstName}
            size="large"
            backgroundColor="dark200"
            avatarColor="white"
            borderColor="dark200"
          />
          <Text style={styles.medal}>🏆</Text>
        </>
      </Confetti>

      <Text style={styles.winnerOfTheWeek}>
        {t(`app:screen:leaderboard:winnerOfTheWeek:${gender}`)}
      </Text>
    </>
  )
}

export const styles = StyleSheet.create({
  winnerOfTheWeek: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.white,
    marginBottom: 8,
  },
  confettiContainer: {
    marginBottom: 8,
  },
  medal: {
    position: 'absolute',
    bottom: -44,
    fontSize: 60,
  },
})
