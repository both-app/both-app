import React, { FC, createContext, useState, useMemo } from 'react'

interface CameraContextProps {
  cameraIsOpen: boolean
  setCameraIsOpen: (value: boolean) => void
  lastPictureTaken: any
  setPicture: (value: any) => void
}

const CameraContext = createContext<CameraContextProps>({
  cameraIsOpen: false,
  lastPictureTaken: null,
  // @ts-ignore
  setCameraIsOpen: () => {},
  // @ts-ignore
  setPicture: () => {},
})

const CameraContextProvider: FC = ({ children }) => {
  const [cameraIsOpen, setCameraIsOpen] = useState<boolean>(false)
  const [lastPictureTaken, setPicture] = useState()

  const cameraContextApi = useMemo(
    () => ({
      cameraIsOpen,
      setCameraIsOpen,
      setPicture,
      lastPictureTaken,
    }),
    [cameraIsOpen, setCameraIsOpen, setPicture, lastPictureTaken]
  )

  return (
    <CameraContext.Provider value={cameraContextApi}>
      {children}
    </CameraContext.Provider>
  )
}

export { CameraContext, CameraContextProvider }
