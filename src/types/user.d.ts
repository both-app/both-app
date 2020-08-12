interface ApiUser {
  id: string
  firstName: string
  gender: 'male' | 'female' | 'other'
  relationId: string
  pushToken: string
  avatarPath: string
  birthDate?: string
}

interface User extends ApiUser {
  avatarUrl: string
}

interface RankedUser extends User {
  points: number
  favoriteTask: Task
  isWinner: boolean
  isMe: boolean
}
