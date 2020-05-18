interface TaskDifficulty {
  emoji: string
  name: string
  points: number
}

interface Task {
  id: string
  categoryId: string
  emoji: string
  name: string
  serverOnly: boolean
  relationId?: string
  difficulties: TaskDifficulty[]
}
