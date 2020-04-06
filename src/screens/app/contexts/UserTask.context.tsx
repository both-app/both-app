import React, { FC, createContext, useMemo, useState } from 'react'

interface UserTaskContextProps {
  userTasks: UserTask[]
}

const UserTaskContext = createContext<UserTaskContextProps>({
  userTasks: [],
})

const UserTaskContextProvider: FC = ({ children }) => {
  const [userTasks, setUserTasks] = useState<UserTask[]>([])

  const userTaskContextApi = useMemo(
    () => ({
      userTasks,
    }),
    [userTasks]
  )

  return (
    <UserTaskContext.Provider value={userTaskContextApi}>
      {children}
    </UserTaskContext.Provider>
  )
}

export { UserTaskContext, UserTaskContextProvider }
