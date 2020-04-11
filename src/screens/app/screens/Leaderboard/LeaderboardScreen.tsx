import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'
import { Layout } from 'library/layouts/Layout'
import { Badge } from 'library/components/Badge'

import { RelationStatus } from 'screens/app/components/RelationStatus'
import { Confetti } from 'screens/app/components/Confetti'
import { User } from './components/User'

export const LeaderboardScreen = () => {
  const { t } = useT()

  return (
    <Layout
      header={
        <>
          <Confetti containerStyle={styles.confettiContainer}>
            <>
              <Avatar firstname="Mathieu" size="large" />
              <Text style={styles.medal}>🏆</Text>
            </>
          </Confetti>

          <Text style={styles.winnerOfTheWeek}>
            {t('app:screen:leaderboard:winnerOfTheWeek:male')}
          </Text>
          <RelationStatus />
        </>
      }
      badge={
        <Badge color="warning">
          {t('app:screen:leaderBoard:counterEndOfWeek', { time: '18:52:01' })}
        </Badge>
      }
    >
      <ScrollView>
        <User
          firstName="Mathieu (moi)"
          isWinner
          points={32}
          taskName="Faire le lit"
        />
        <User
          firstName="Charlotte"
          isWinner={false}
          points={16}
          taskName="Faire la vaiselle"
        />
      </ScrollView>
    </Layout>
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
