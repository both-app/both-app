import React, { useEffect, useState, FC } from 'react'
import endOfWeek from 'date-fns/endOfWeek'

import { useT } from 'res/i18n'
import { getDifferenceWithNow } from 'res/date'
import { wait } from 'res/utils'

import { Badge } from 'library/components/Badge'

export const CountdownBadge: FC = () => {
  const { t } = useT()
  const [time, setTime] = useState<string>('')
  const lastDayOfWeek = endOfWeek(new Date(), { weekStartsOn: 1 })

  useEffect(() => {
    const startCountdown = async () => {
      const deadline = getDifferenceWithNow(lastDayOfWeek)

      // Display the badge 1 day before the end of the week
      if (deadline.days > 0) {
        return
      }

      await wait(1000)

      setTime(`${deadline.hours}:${deadline.minutes}:${deadline.seconds}`)
    }

    startCountdown()
  }, [time])

  if (!time) {
    return null
  }

  return (
    <Badge color="warning">
      {t('app:screen:leaderBoard:counterEndOfWeek', { time })}
    </Badge>
  )
}
