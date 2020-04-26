import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { colors } from 'res/colors'

import { MinimalButton } from 'library/components/MinimalButton'
import { Avatar } from 'library/components/Avatar'

interface MemberProps {
  firsName: string
  emoji: string
  avatarUrl: any
  post: string
  relationStatus: string
  onAction: VoidFunction
}

export const Member: FC<MemberProps> = ({
  firsName,
  post,
  emoji,
  relationStatus,
  avatarUrl,
  onAction,
}) => (
  <View style={styles.teamMember}>
    <View style={styles.avatarContainer}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Avatar
        size="small"
        avatarUrl={avatarUrl}
        borderWidth={2}
        borderColor="skin200"
      />
    </View>

    <View style={styles.memberInfo}>
      <View style={styles.row}>
        <Text style={styles.name}>{firsName} • </Text>
        <Text>{post}</Text>
      </View>
      <Text style={styles.relationStatus}>{relationStatus}</Text>
    </View>

    <View>
      <MinimalButton
        iconName="linkedin"
        fill={colors.dark200}
        onAction={onAction}
      />
    </View>
  </View>
)

export const styles = StyleSheet.create({
  teamMember: {
    width: '100%',
    backgroundColor: colors.skin200,
    borderRadius: 8,
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  memberInfo: {
    flex: 1,
    paddingLeft: 16,
    marginRight: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  emoji: {
    position: 'absolute',
    left: -17,
    top: 10,
    fontSize: 26,
    zIndex: 100,
  },
  relationStatus: {
    color: colors.dark200,
    opacity: 0.75,
    marginTop: 2,
  },
  name: {
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
})
