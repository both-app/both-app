import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import SegmentedControlTabs from 'react-native-segmented-control-tab'

interface SegmentedControlProps {
  values: string[]
  selectedIndex: number
  onTabPress: (index: number) => void
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onTabPress,
}) => {
  return (
    <SegmentedControlTabs
      values={values}
      selectedIndex={selectedIndex}
      onTabPress={onTabPress}
      tabsContainerStyle={styles.container}
      tabStyle={styles.tab}
      borderRadius={6}
      activeTabStyle={styles.activeTab}
      tabTextStyle={styles.tabText}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    height: 40,
    backgroundColor: 'rgba(118,118,128,0.24)',
    borderRadius: 8,
  },
  tab: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 6,
    margin: 3,
  },
  activeTab: { backgroundColor: '#636366' },
  tabText: { color: 'white', fontWeight: '500' },
})
