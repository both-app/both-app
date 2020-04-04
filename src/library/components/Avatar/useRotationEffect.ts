import { useRef } from 'react'
import { Animated } from 'react-native'

export const useRotationAnimation = ({
  iteration,
  rotationDuration,
  delayBetweenRotations,
}: {
  iteration: number
  rotationDuration: number
  delayBetweenRotations: number
}) => {
  const value = useRef(new Animated.Value(0)).current

  const startRotate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: rotationDuration,
          useNativeDriver: true,
        }),
        Animated.delay(delayBetweenRotations),
        Animated.timing(value, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      { iterations: iteration }
    ).start()
  }

  const stopRotate = () => value.stopAnimation()

  const rotateData = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return {
    startRotate,
    stopRotate,
    rotateData,
  }
}
