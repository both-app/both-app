import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from '@nvthai/react-native-swipe-list-view'

import { ListItem } from './components/ListItem/ListItem'
import { ListActions } from './components/ListActions'

const ITEMS = [
  {
    type: '',
    text: 'Faire à manger',
    count: 2,
  },
  {
    type: '',
    text: "Passer l'aspirateur",
    count: 1,
  },
  {
    type: '',
    text: 'Faire la vaiselle',
    count: 0,
  },
  {
    type: '',
    text: 'Sortir les poubelles',
    count: -1,
  },
  {
    type: '',
    text: 'Repasser le linge',
    count: -2,
  },
  {
    type: '',
    text: 'Sortir médor',
    count: -3,
  },
]

export const DashboardScreen = () => (
  <View style={styles.container}>
    <SwipeListView
      useFlatList
      data={ITEMS}
      disableRightSwipe
      keyExtractor={(_, index) => `${index}`}
      renderItem={(data) => <ListItem index={data.index} item={data.item} />}
      renderHiddenItem={() => <ListActions />}
      rightOpenValue={-75}
      stopRightSwipe={-150}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
