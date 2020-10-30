import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'
import { colors } from 'res/colors'

import { CardButton } from 'library/components/CardButton'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { TaskRequestContext } from 'screens/app/contexts/TaskRequest.context'

export const TasksRequestButton = () => {
  const { t } = useT()
  const navigation = useNavigation()

  const { partner } = useContext(UsersContext)
  const { partnerRequests } = useContext(TaskRequestContext)

  const hasPartner = !!partner.id

  return (
    <View style={{ marginTop: hasPartner ? 24 : 12 }}>
      {hasPartner && (
        <CardButton
          emoji="⏳"
          containerStyle={styles.relationTasksButton}
          title={t('app:screen:home:button:relationTasks:title', {
            count: partnerRequests.length,
            tasks: partnerRequests.length,
          })}
          subtitle={t('app:screen:home:button:relationTasks:subtitle', {
            count: partnerRequests.length,
            partnerName: partner.firstName,
          })}
          onAction={() => navigation.navigate('Relation')}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  relationTasksButton: {
    borderColor: colors.grey100,
    borderStyle: 'dashed',
    borderWidth: 2,
    backgroundColor: colors.skin200,
    marginHorizontal: 24,
  },
})
