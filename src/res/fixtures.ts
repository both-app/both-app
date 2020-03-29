import { colors } from './colors'

export const CATEGORIES: Category[] = [
  {
    id: '1',
    icon: '🧺',
    color: colors.pink,
    name: 'Quotidien',
  },
  {
    id: '2',
    icon: '🍕',
    color: colors.pink,
    name: 'Alimentation',
  },
  {
    id: '3',
    icon: '🐶',
    color: colors.blueLight,
    name: 'Animaux',
  },
  {
    id: '4',
    icon: '🧽',
    color: colors.blueLight,
    name: 'Ménage',
  },
  {
    id: '5',
    icon: '🧸',
    color: colors.blueDark,
    name: 'Enfants',
  },
  {
    id: '6',
    icon: '💙',
    color: colors.blueDark,
    name: 'Spécial couple',
  },
]

export const TASKS: Task[] = [
  {
    id: 'A',
    categoryId: '3', // Animaux
    icon: '🍗',
    name: 'Donner à manger',
    points: 1,
  },
  {
    id: 'B',
    categoryId: '3', // Animaux
    icon: '🐶',
    name: 'Promener le chien',
    points: 4,
  },
  {
    id: 'C',
    categoryId: '3', // Animaux
    icon: '😼',
    name: 'Netoyer la litière',
    points: 3,
  },
  {
    id: 'D',
    categoryId: '3', // Animaux
    icon: '🐾',
    name: 'Aller chez le véto',
    points: 2,
  },
]
