import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import ArrowRightCircle from '../../../../assets/icons/arrow-right-circle.svg'
import ChevronLeft from '../../../../assets/icons/chevron-left.svg'
import Check from '../../../../assets/icons/check.svg'
import Plus from '../../../../assets/icons/plus.svg'
import Award from '../../../../assets/icons/award.svg'
import Heart from '../../../../assets/icons/heart.svg'
import List from '../../../../assets/icons/list.svg'
import X from '../../../../assets/icons/x.svg'
import Share from '../../../../assets/icons/share.svg'

type IconName =
  | 'arrow_right_circle'
  | 'chevron_left'
  | 'check'
  | 'plus'
  | 'award'
  | 'heart'
  | 'list'
  | 'close'
  | 'share'

export interface IconProps extends SvgProps {
  iconName: IconName
  style?: any
}

export const Icon: FC<IconProps> = ({ iconName, ...props }) => {
  const mapping: Record<IconName, React.FC<SvgProps>> = {
    arrow_right_circle: ArrowRightCircle,
    chevron_left: ChevronLeft,
    check: Check,
    plus: Plus,
    award: Award,
    heart: Heart,
    list: List,
    close: X,
    share: Share,
  }

  const Icon = mapping[iconName]

  return <Icon {...props} />
}
