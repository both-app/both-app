import React, { useContext, useState, useMemo } from 'react'
import { RefreshControl, StyleSheet, SectionList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { CardButton } from 'library/components/CardButton'
import { UserTask } from './UserTask'
import { Section } from './Section'

import { wait } from 'res/utils'
import { useT } from 'res/i18n'

import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

export const UserTasks = () => {
  const navigation = useNavigation()
  const { t, locale } = useT()
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const { fetchUserTasks, userTasksByDate, userTasks } = useContext(
    UserTaskContext
  )

  const handleOnRefresh = async () => {
    setIsRefreshing(true)

    await Promise.all([wait(1000), fetchUserTasks()])

    setIsRefreshing(false)
  }

  const formattedList = useMemo(() => {
    return Object.entries(userTasksByDate).map(([date, tasks]) => ({
      title: new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      data: tasks,
    }))
  }, [userTasks])

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
