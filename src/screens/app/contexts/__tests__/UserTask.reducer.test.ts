import { userTaskReducer, State } from '../UserTask.reducer'

const initialState: State = {
  allIds: ['A'],
  byId: {
    A: {
      id: 'A',
      userId: 'userIdA',
      taskId: 'taskIdA',
      createdAt: '2020-04-06T18:52:08.085Z',
      relationId: 'relationIdA',
      points: 1,
    },
  },
}

describe('UserTaskReducer', () => {
  test('pushAllUserTasks', () => {
    const result = userTaskReducer(initialState, {
      type: 'pushAllUserTasks',
      userTasks: [
        {
          id: 'B',
          userId: 'userIdA',
          createdAt: '2020-04-06',
          taskId: 'taskId1',
          relationId: 'relationIdA',
          points: 2,
        },
        {
          id: 'C',
          userId: 'userIdB',
          createdAt: '2020-04-06',
          taskId: 'taskId1',
          relationId: 'relationIdA',
          points: 1,
        },
      ],
    })

    expect(result).toMatchSnapshot()
  })

  test('pushUserTask', () => {
    const result = userTaskReducer(initialState, {
      type: 'pushUserTask',
      userTask: {
        id: 'B',
        userId: 'userIdA',
        createdAt: '2020-04-06',
        taskId: 'taskId1',
        relationId: 'relationIdA',
        points: 1,
      },
    })

    expect(result).toMatchSnapshot()
  })

  test('deleteUserTask', () => {
    const result = userTaskReducer(initialState, {
      type: 'deleteUserTask',
      userTaskId: 'A',
    })

    expect(result).toMatchSnapshot()
  })
})
