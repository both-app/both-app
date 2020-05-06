interface User {
  id: string
  firstName: string
  gender: 'male' | 'female' | 'other'
  relationId: string
  pushToken: string
}
