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
