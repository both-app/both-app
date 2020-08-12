import Constants from 'expo-constants'

const { manifest } = Constants

export type Environment = 'staging' | 'production'

const getEnvironment = (): Environment => {
  const isStaging = __DEV__ || manifest.releaseChannel === 'staging'

  return isStaging ? 'staging' : 'production'
}

export const ENVIRONMENT = getEnvironment()
