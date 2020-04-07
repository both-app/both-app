import { useState, useEffect } from 'react'

import { wait } from 'res/utils'

export const useCounter = (value: number) => {
  const [newValue, setNewValue] = useState(0)

  useEffect(() => {
    const changeValue = async () => {
      if (newValue !== value) {
        await wait(150)

        if (value > newValue) {
          setNewValue(newValue + 1)
        } else {
          setNewValue(newValue - 1)
        }
      }
    }

    changeValue()
  }, [value, newValue])

  return newValue
}
