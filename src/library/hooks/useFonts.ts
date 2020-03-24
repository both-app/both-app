import { useState, useEffect } from 'react'
import * as Font from 'expo-font'

type Fonts = Record<string, any>

export const useFonts = (fonts: Fonts) => {
  const [fontsLoaded, setFontLoaded] = useState<boolean>(false)

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync(fonts)

      setFontLoaded(true)
    }

    loadFont()
  }, [])

  return {
    fontsLoaded,
  }
}
