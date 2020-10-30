type TaskRequestStatus = 'done' | 'archived' | 'requested'

interface TaskRequest<S = TaskRequestStatus> {
  id: string
  taskId: string
  userId: string
  createdAt: string
  relationId: string
  categoryId: string
  status: S
}
