import { useNavigation } from '@react-navigation/native'
import { CardButton } from 'library/components/CardButton'
import React, { useContext, useMemo, useState } from 'react'
import { RefreshControl, SectionList, StyleSheet, View } from 'react-native'
import { useT } from 'res/i18n'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { Section } from './Section'
import { UserTask } from './UserTask'

export const UserTasks = () => {
  const navigation = useNavigation()
  const { t, locale } = useT()
  const { fetchUsers } = useContext(UsersContext)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const { fetchUserTasks, userTasksByDate, allIds } = useContext(
    UserTaskContext
  )
  const { fetchUserScore } = useContext(UserScoreContext)

  const handleOnRefresh = async () => {
    setIsRefreshing(true)

    await fetchUsers()
    await fetchUserTasks()
    await fetchUserScore()

    setIsRefreshing(false)
  }

  const formattedList = useMemo(() => {
    return Object.entries(userTasksByDate).map(([date, userTasks]) => ({
      title: new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      data: userTasks,
    }))
  }, [allIds])

  return (
    <SectionList
      // @ts-ignore
      sections={formattedList}
      style={styles.listContainer}
      keyExtractor={(_, index) => `${index}`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
      }
      ListHeaderComponent={
        <CardButton
          emoji="➕"
          title={t('app:screen:dashboard:addNewTaskButton')}
          withHapticFeedback
          onAction={() => navigation.navigate('AddTask')}
        />
      }
      renderSectionHeader={({ section: { title } }) => (
        <Section title={title} />
      )}
      ListFooterComponent={<View style={styles.listFooter} />}
      renderItem={({ item }) => <UserTask userTask={item} />}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listFooter: {
    marginBottom: 24 * 3,
  },
})
