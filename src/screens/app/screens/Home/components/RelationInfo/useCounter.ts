import { useState, useEffect } from 'react'

import { wait } from 'res/utils'

export const useCounter = (value: number) => {
  const [isInited, setIsInit] = useState(false)
  const [newValue, setNewValue] = useState(0)

  useEffect(() => {
    const changeValue = async () => {
      if (value > 0 && newValue === 0 && !isInited) {
        setIsInit(true)
        return setNewValue(value)
      }

      if (newValue !== value) {
        await wait(150)

        if (value > newValue) {
          return setNewValue(newValue + 1)
        }

        return setNewValue(newValue - 1)
      }
    }

    changeValue()
  }, [value, newValue])

  return newValue
}
