import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import AddCircle from '../../../../assets/icons/add_circle.svg'
import Dashboard from '../../../../assets/icons/dashboard.svg'
import Relation from '../../../../assets/icons/relation.svg'
import BrokenHeart from '../../../../assets/icons/broken_heart.svg'

type IconName = 'add_circle' | 'dashboard' | 'relation' | 'broken_heart'

export interface IconProps extends SvgProps {
  iconName: IconName
}

export const Icon: FC<IconProps> = ({ iconName, ...props }) => {
  const mapping: Record<IconName, React.FC<SvgProps>> = {
    add_circle: AddCircle,
    dashboard: Dashboard,
    relation: Relation,
    broken_heart: BrokenHeart,
  }

  const Icon = mapping[iconName]

  return <Icon {...props} />
}
