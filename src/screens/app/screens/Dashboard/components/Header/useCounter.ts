import { useState, useEffect } from 'react'

export const useCounter = (value: number) => {
  const [newValue, setNewValue] = useState(0)

  useEffect(() => {
    if (newValue !== value) {
      setTimeout(() => {
        setNewValue(newValue + 1)
      }, 150)
    }
  }, [value, newValue])

  return newValue
}
