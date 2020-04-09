import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

import { Badge } from 'library/components/Badge'
import { RelationContext } from 'screens/app/contexts/Relation.context'

export const ShareRelationKey = () => {
  const { setShareKeyModal } = useContext(RelationContext)

  const handleOnPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setShareKeyModal(true)
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleOnPress}>
      <Badge color="warning">Partager la clé Both</Badge>
    </TouchableOpacity>
  )
}
