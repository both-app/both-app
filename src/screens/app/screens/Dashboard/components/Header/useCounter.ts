import { useState, useEffect } from 'react'

export const useCounter = ({
  value,
  timeout,
}: {
  value: number
  timeout: number
}) => {
  const [newValue, setNewValue] = useState(0)

  useEffect(() => {
    if (newValue !== value) {
      setTimeout(() => {
        setNewValue(newValue + 1)
      }, timeout)
    }
  }, [value, newValue])

  return newValue
}
