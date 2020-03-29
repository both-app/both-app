import React from 'react'

import { CardButton } from 'screens/app/components/CardButton'

export const Task = ({ color, icon, title, author, points }) => {
  const containerStyle = {
    backgroundColor: color,
  }

  return (
    <CardButton
      containerStyle={containerStyle}
      icon={icon}
      title={title}
      subtitle={`Par ${author}`}
      points={points}
      onAction={console.log}
    />
  )
}
