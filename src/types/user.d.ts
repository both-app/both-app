interface User {
  id: string
  firstName: string
  gender: 'male' | 'female' | 'other'
  relationId: string
  birthDate: string
  pushToken: string
}
