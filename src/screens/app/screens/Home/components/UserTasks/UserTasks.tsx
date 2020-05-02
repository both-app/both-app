import React, { useContext, useState } from 'react'
import { RefreshControl, SectionList, StyleSheet, View } from 'react-native'
import format from 'date-fns/format'

import { getLongDateFormat, getDateFnsLocale } from 'res/date'
import { useT } from 'res/i18n'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { Section } from './Section'
import { UserTask } from './UserTask'

export const UserTasks = () => {
  const { locale } = useT()
  const { fetchUsers } = useContext(UsersContext)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const { fetchUserTasks, userTasksByDate } = useContext(UserTaskContext)
  const { fetchUserScore } = useContext(UserScoreContext)

  const handleOnRefresh = async () => {
    setIsRefreshing(true)

    await fetchUsers()
    await Promise.all([fetchUserScore(), fetchUserTasks()])

    setIsRefreshing(false)
  }

  const formattedList = Object.entries(userTasksByDate).map(
    ([date, userTasks]) => ({
      title: format(new Date(date), getLongDateFormat(locale), {
        locale: getDateFnsLocale(locale),
        weekStartsOn: 1,
      }),
      data: userTasks,
    })
  )

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
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={<View style={styles.listHeader} />}
      renderSectionHeader={({ section: { title } }) => (
        <Section title={title} />
      )}
      ListFooterComponent={<View style={styles.listFooter} />}
      renderItem={({ item }) => <UserTask userTask={item} key={item.id} />}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listFooter: {
    marginBottom: 24,
  },
  listHeader: {
    marginTop: 12,
  },
})
