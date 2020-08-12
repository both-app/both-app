import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useT } from 'res/i18n'
import { Confetti } from 'screens/app/components/Confetti'
import { Avatar } from 'library/components/Avatar'
import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

interface WinnerHeaderProps {
  scoreType: ScoreType
  rankedUser: RankedUser
}

export const WinnerHeader: FC<WinnerHeaderProps> = ({
  rankedUser,
  scoreType,
}) => {
  const { t } = useT()
  const { avatarUrl, firstName, gender } = rankedUser

  return (
    <>
      <Confetti containerStyle={styles.confettiContainer}>
        <>
          <Avatar
            avatar={avatarUrl}
            firstname={firstName}
            size="large"
            backgroundColor="dark200"
            avatarColor="white"
            borderColor="dark200"
          />
          <Text style={styles.medal}>🏆</Text>
        </>
      </Confetti>

      <Text style={styles.text}>
        {scoreType === 'global'
          ? t('app:screen:leaderboard:winners')
          : t(`app:screen:leaderboard:winnerOfTheWeek:${gender}`)}
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
  medal: {
    position: 'absolute',
    bottom: -44,
    fontSize: 60,
  },
})
