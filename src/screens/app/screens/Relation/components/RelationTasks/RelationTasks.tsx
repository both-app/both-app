import React, { useContext, useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Scroll } from 'library/layouts/Scroll'
import { SegmentedControl } from 'library/components/SegmentedControl'
import { Point } from 'library/components/Point'

import { TaskRequestContext } from 'screens/app/contexts/TaskRequest.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { RelationTask } from '../RelationTask/RelationTask'
import { useNavigation } from '@react-navigation/native'
import { CategoryContext } from 'screens/app/contexts/Category.context'

export const RelationTasks = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const { partnerRequests, myRequests } = useContext(TaskRequestContext)
  const { getTaskById, getPoints } = useContext(TaskContext)
  const { getCategoryById } = useContext(CategoryContext)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'toDo' | 'requests'>('toDo')
  const tasksToDisplay = selectedTab === 'toDo' ? partnerRequests : myRequests

  useEffect(() => {
    setSelectedTab(selectedIndex === 0 ? 'toDo' : 'requests')
  }, [selectedIndex])

  const handleOnAction = (task: Task) => {
    if (selectedTab === 'requests') {
      return
    }

    const taskCategory = getCategoryById(task.categoryId)

    if (task.difficulties.length === 1) {
      return navigation.navigate('AddTaskModal', {
        screen: 'ChooseTask',
        params: { mode: 'userTask', category: taskCategory },
      })
    }

    return navigation.navigate('AddTaskModal', {
      screen: 'ChooseTaskDifficulty',
      params: { task: task, category: taskCategory },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <SegmentedControl
          values={[
            t('app:screen:relation:relationTasks:control:toDo', {
              number: partnerRequests.length,
            }),
            t('app:screen:relation:relationTasks:control:requests', {
              number: myRequests.length,
            }),
          ]}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
          activeTabBackgroundColor="white"
          backgroundColor="rgba(118,118,128,0.24)"
          textColor="dark200"
        />
      </View>

      {!!tasksToDisplay.length && (
        <>
          <Text style={styles.remainderTasks}>
            {selectedTab === 'toDo'
              ? t('app:screen:relation:relationTasks:tasksToDo', {
                  count: tasksToDisplay.length,
                  tasks: tasksToDisplay.length,
                })
              : t('app:screen:relation:relationTasks:requested', {
                  count: tasksToDisplay.length,
                  tasks: tasksToDisplay.length,
                })}
          </Text>
          <Scroll marginBottom={24} marginTop={8}>
            {tasksToDisplay.map((relationTask) => {
              const task = getTaskById(relationTask.taskId)

              return (
                <RelationTask
                  key={relationTask.id}
                  isDone={relationTask.status === 'done'}
                  emoji={task?.emoji}
                  title={task?.name}
                  onAction={() => handleOnAction(task)}
                  subtitle={
                    selectedTab === 'toDo'
                      ? t('app:screen:relation:relationTasks:task:toDo')
                      : t('app:screen:relation:relationTasks:task:inPending')
                  }
                  rightContent={
                    <Point
                      // @ts-ignore
                      points={getPoints(relationTask.taskId)}
                      shape={
                        task?.difficulties.length > 1 ? 'rectangle' : 'circle'
                      }
                    />
                  }
                />
              )
            })}
          </Scroll>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    marginBottom: 16,
  },
  remainderTasks: {
    fontSize: 14,
    color: colors.dark200,
  },
})
