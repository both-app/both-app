import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import RSegmentedControl, {
  SegmentedControlTabProperties,
} from 'react-native-segmented-control-tab'

export const SegmentedControl: FC<SegmentedControlTabProperties> = (props) => (
  <RSegmentedControl
    tabsContainerStyle={styles.tabsContainer}
    tabStyle={styles.tab}
    borderRadius={6}
    activeTabStyle={styles.activeTab}
    tabTextStyle={styles.tabText}
    {...props}
  />
)

const styles = StyleSheet.create({
  tabsContainer: {
    marginBottom: 50,
    height: 35,
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
