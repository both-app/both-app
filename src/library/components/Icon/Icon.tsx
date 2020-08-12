import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import ArrowRight from '../../../../assets/icons/arrow-right.svg'
import ArrowLeft from '../../../../assets/icons/arrow-left.svg'
import ChevronLeft from '../../../../assets/icons/chevron-left.svg'
import Check from '../../../../assets/icons/check.svg'
import Plus from '../../../../assets/icons/plus.svg'
import Award from '../../../../assets/icons/award.svg'
import Heart from '../../../../assets/icons/heart.svg'
import List from '../../../../assets/icons/list.svg'
import X from '../../../../assets/icons/x.svg'
import Share from '../../../../assets/icons/share.svg'
import Camera from '../../../../assets/icons/camera.svg'
import Rotate from '../../../../assets/icons/rotate.svg'
import Loader from '../../../../assets/icons/loader.svg'
import Linkedin from '../../../../assets/icons/linkedin.svg'
import Trash from '../../../../assets/icons/trash.svg'
import Users from '../../../../assets/icons/users.svg'
import Settings from '../../../../assets/icons/settings.svg'
import Home from '../../../../assets/icons/home.svg'
import Archive from '../../../../assets/icons/archive.svg'

export type IconName =
  | 'arrow_right'
  | 'arrow_left'
  | 'chevron_left'
  | 'check'
  | 'plus'
  | 'award'
  | 'heart'
  | 'list'
  | 'close'
  | 'share'
  | 'camera'
  | 'rotate'
  | 'loader'
  | 'linkedin'
  | 'trash'
  | 'users'
  | 'settings'
  | 'home'
  | 'archive'

export interface IconProps extends SvgProps {
  iconName: IconName
  style?: any
}

export const Icon: FC<IconProps> = ({ iconName, ...props }) => {
  const mapping: Record<IconName, React.FC<SvgProps>> = {
    arrow_right: ArrowRight,
    arrow_left: ArrowLeft,
    chevron_left: ChevronLeft,
    check: Check,
    plus: Plus,
    award: Award,
    heart: Heart,
    list: List,
    close: X,
    share: Share,
    camera: Camera,
    rotate: Rotate,
    loader: Loader,
    linkedin: Linkedin,
    trash: Trash,
    users: Users,
    home: Home,
    settings: Settings,
    archive: Archive,
  }

  const Icon = mapping[iconName]

  return <Icon {...props} />
}
