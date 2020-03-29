import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { CardButton } from 'screens/app/components/CardButton'
import { colors } from 'res/colors'

interface CategoryButtonProps {
  category: Category
  tasks: Task[]
}

export const CategoryButton: FC<CategoryButtonProps> = ({
  category,
  tasks,
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
