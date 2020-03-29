import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors } from 'res/colors'

export const ButtonAddTask: FC<TouchableOpacityProps> = (props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Text style={styles.icon}>➕</Text>
    <Text style={styles.text}>Ajouter une tâche</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beigeDark,
    paddingTop: 17,
    paddingBottom: 13,
    paddingLeft: 16,
    borderRadius: 8,
    height: 64,
  },
  icon: {
    fontSize: 26,
  },
  text: {
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '500',
  },
})
