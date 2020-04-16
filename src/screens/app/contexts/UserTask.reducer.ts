export interface State {
  byId: {
    [id: string]: UserTask
  }
  allIds: string[]
}

type UserTaskAction =
  | {
      type: 'pushAllUserTasks'
      userTasks: UserTask[]
    }
  | { type: 'pushUserTask'; userTask: UserTask }
  | { type: 'deleteUserTask'; userTaskId: string }

export const userTaskInitialState: State = {
  allIds: [],
  byId: {},
}

export const userTaskReducer = (
  state: State,
  action: UserTaskAction
): State => {
  if (action.type === 'pushAllUserTasks') {
    return {
      ...state,
      allIds: action.userTasks.map(({ id }) => id),
      byId: action.userTasks.reduce(
        (acc, userTask) => ({
          ...acc,
          [userTask.id]: userTask,
        }),
        {}
      ),
    }
  }

  if (action.type === 'pushUserTask') {
    return {
      ...state,
      allIds: [action.userTask.id, ...state.allIds],
      byId: {
        ...state.byId,
        [action.userTask.id]: action.userTask,
      },
    }
  }

  if (action.type === 'deleteUserTask') {
    return {
      ...state,
      allIds: state.allIds.filter((id) => id !== action.userTaskId),
    }
  }

  return state
}
