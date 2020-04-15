import { Map } from 'immutable'

export interface State {
  userTasks: Map<string, UserTask>
}

type UserTaskAction =
  | {
      type: 'pushAllUserTasks'
      userTasks: UserTask[]
    }
  | { type: 'pushUserTask'; userTask: UserTask }
  | { type: 'deleteUserTask'; userTaskId: string }

export const userTaskInitialState: State = {
  userTasks: Map(),
}

export const userTaskReducer = (
  state: State,
  action: UserTaskAction
): State => {
  if (action.type === 'pushAllUserTasks') {
    return {
      ...state,
      userTasks: action.userTasks.reduce(
        (acc: Map<string, UserTask>, task: UserTask) => {
          return acc.set(task.id, task)
        },
        Map()
      ),
    }
  }

  if (action.type === 'pushUserTask') {
    return {
      ...state,
      userTasks: state.userTasks.set(action.userTask.id, action.userTask),
    }
  }

  if (action.type === 'deleteUserTask') {
    return {
      ...state,
      userTasks: state.userTasks.delete(action.userTaskId),
    }
  }

  return state
}
