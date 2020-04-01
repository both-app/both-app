import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Color } from 'res/colors'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'
import { Avatar } from 'library/components/Avatar'
import { Medal } from './Medal'
import { Counter } from './Counter'

interface WeekModalProps {
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
  type: 'winner' | 'loser'
}

export const WeekModal: FC<WeekModalProps> = ({
  visible,
  onClose,
  onAction,
  type,
}) => {
  const emoji = {
    winner: '🏆',
    loser: '💩',
  }[type]

  const badgeTitle = {
    winner: "C'est gagné 🥳",
    loser: "C'est perdu 😓",
  }[type]

  const badgeColor = {
    winner: 'success',
    loser: 'danger',
  }[type] as Color

  const infoPrimary = {
    winner: '👍 Tu as gagné cette semaine !',
    loser: '👎 Tu as perdu cette semaine !',
  }[type]

  const infoSecondary = {
    winner: 'Demande ce que tu veux à ton acolyte…',
    loser: 'Tu pourrais faire mieux, vraiment…',
  }[type]

  return (
    <Modal
      visible={visible}
      emoji={emoji}
      onClose={onClose}
      onAction={onAction}
      primaryActionIconName="check"
    >
      <Badge color={badgeColor}>{badgeTitle}</Badge>

      <View style={styles.container}>
        <View style={{ ...styles.user, ...styles.winnerUser }}>
          <View style={styles.avatarContainer}>
            <Medal type="winner" />

            <Avatar
              firstname="Mathieu"
              size="large"
              borderColor="highlight200"
            />
          </View>

          <Counter type="winner">180</Counter>
        </View>

        <View style={styles.user}>
          <View style={styles.avatarContainer}>
            <Medal type="loser" />

            <Avatar firstname="Selena" size="medium" />
          </View>

          <Counter type="loser">0</Counter>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Info color="white" primary={infoPrimary} secondary={infoSecondary} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
  container: {
    marginTop: 40,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  winnerUser: {
    marginRight: 21,
  },
  avatarContainer: {
    position: 'relative',
  },
})
