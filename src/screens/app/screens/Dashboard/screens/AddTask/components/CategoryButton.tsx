import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { CardButton } from 'screens/app/components/CardButton'
import { colors } from 'res/colors'

interface CategoryButtonProps {
  category: Category
  tasks: Task[]
  onAction: VoidFunction
  active: boolean
}

export const CategoryButton: FC<CategoryButtonProps> = ({
  category,
  tasks,
  onAction,
  active,
}) => {
  const activeCardButtonContainer = {
    backgroundColor: category.color,
  }

  return (
    <CardButton
      containerStyle={styles.cardButtonContainer}
      activeContainerStyle={activeCardButtonContainer}
      textStyle={styles.cardText}
      activeTextStyle={styles.activeCardText}
      icon={category.icon}
      title={category.name}
      subtitle={`${tasks.length} tâches`}
      onAction={onAction}
      active={active}
    />
  )
}

const styles = StyleSheet.create({
  cardButtonContainer: {
    backgroundColor: colors.beigeDark,
  },
  cardText: {
    color: colors.blueDark,
  },
  activeCardText: {
    color: 'white',
  },
})
