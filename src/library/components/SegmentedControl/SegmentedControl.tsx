import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import RSegmentedControl, {
  SegmentedControlTabProperties,
} from 'react-native-segmented-control-tab'
import { Color, colors } from 'res/colors'

interface SegmentedControlProps {
  values: any[]
  selectedIndex: number
  onTabPress: (index: number) => void
  activeTabBackgroundColor?: Color
  backgroundColor?: string
  textColor?: Color
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onTabPress,
  activeTabBackgroundColor,
  backgroundColor,
  textColor,
}) => (
  <RSegmentedControl
    tabsContainerStyle={{ ...styles.tabsContainer, backgroundColor }}
    tabStyle={styles.tab}
    borderRadius={6}
    activeTabStyle={{
      backgroundColor: colors[activeTabBackgroundColor],
    }}
    tabTextStyle={{ ...styles.tabText, color: colors[textColor] }}
    activeTabTextStyle={{ ...styles.activeTabText, color: colors[textColor] }}
    values={values}
    selectedIndex={selectedIndex}
    onTabPress={onTabPress}
  />
)

const styles = StyleSheet.create({
  tabsContainer: {
    height: 35,
    borderRadius: 8,
  },
  tab: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 6,
    margin: 3,
  },
  tabText: {
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
})
