import React from 'react'

import { CardButton } from 'library/components/CardButton'

export const Task = ({ color, icon, title, author, points }) => {
  const containerStyle = {
    backgroundColor: color,
  }

  const textStyle = {
    color: 'white',
  }

  return (
    <CardButton
      emoji={icon}
      title={title}
      subtitle={`Par ${author}`}
      points={points}
      containerStyle={containerStyle}
      textStyle={textStyle}
      disabled
    />
  )
}
