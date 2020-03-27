import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Icon } from 'library/components/Icon'
import { colors } from 'res/colors'
import { Counter } from '../Counter'

interface ListItemProps {
  index: number
  item: { count: number; text: string }
}

export const ListItem: FC<ListItemProps> = ({ index, item }) => {
  const style = {
    ...styles.container,
    ...(index % 2 ? styles.odd : styles.pair),
  }

  return (
    <View style={style}>
      <View style={styles.left}>
        <Icon iconName="broken_heart" width={35} fill={colors.greyDark} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
      <View style={styles.right}>
        <Counter count={item.count} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingLeft: 20,
    height: 80,
  },
  pair: {
    backgroundColor: 'white',
  },
  odd: {
    backgroundColor: colors.light,
  },
  left: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 35,
  },
  text: {
    fontFamily: 'gotham-book',
    color: colors.greyDark,
    fontSize: 15,
    marginLeft: 15,
  },
})
