export const CATEGORIES: Category[] = [
  {
    id: '1',
    icon: '🧺',
    color: '#E87180',
    name: 'Quotidien',
  },
  {
    id: '2',
    icon: '🍕',
    color: '#E1B674',
    name: 'Alimentation',
  },
  {
    id: '3',
    icon: '🐶',
    color: '#71C2EB',
    name: 'Animaux',
  },
  {
    id: '4',
    icon: '🧽',
    color: '#69CE7F',
    name: 'Ménage',
  },
  {
    id: '5',
    icon: '🧸',
    color: '#FFA171',
    name: 'Enfants',
  },
  {
    id: '6',
    icon: '💙',
    color: '#7489E1',
    name: 'Spécial couple',
  },
]

const HOUSE_TASKS = [
  {
    id: 'A',
    categoryId: '1',
    icon: '🛠',
    name: 'Travaux maison',
    points: 2,
  },
  {
    id: 'B',
    categoryId: '1',
    icon: '🌵',
    name: 'Arroser les plantes',
    points: 1,
  },
  {
    id: 'C',
    categoryId: '1',
    icon: '🛏',
    name: 'Faire le lit',
    points: 1,
  },
  {
    id: 'D',
    categoryId: '1',
    icon: '🧺',
    name: 'Faire une machine',
    points: 3,
  },
  {
    id: 'E',
    categoryId: '1',
    icon: '🧺',
    name: 'Étendre le linge',
    points: 5,
  },
  {
    id: 'F',
    categoryId: '1',
    icon: '👚',
    name: 'Ranger le linge propre',
    points: 4,
  },
  {
    id: 'G',
    categoryId: '1',
    icon: '🛏',
    name: 'Changer les draps',
    points: 5,
  },
  {
    id: 'H',
    categoryId: '1',
    icon: '🗑',
    name: 'Descendre la poubelle',
    points: 2,
  },
  {
    id: 'I',
    categoryId: '1',
    icon: '🍽',
    name: 'Faire la vaisselle',
    points: 2,
  },
]

const FOOD_TASKS = [
  {
    id: 'AA',
    categoryId: '2',
    icon: '🍝',
    name: 'Trouver une idée de repas',
    points: 1,
  },
  {
    id: 'BB',
    categoryId: '2',
    icon: '🛍',
    name: 'Faire les courses',
    points: 2,
  },
  {
    id: 'CC',
    categoryId: '2',
    icon: '🍲',
    name: 'Faire le repas',
    points: 4,
  },
  {
    id: 'DD',
    categoryId: '2',
    icon: '🍽',
    name: 'Débarrasser le repas',
    points: 4,
  },
]

const ANIMAL_TASKS = [
  {
    id: 'AAA',
    categoryId: '3',
    icon: '🐶',
    name: 'Sortir le chien',
    points: 4,
  },
  {
    id: 'BBB',
    categoryId: '3',
    icon: '😼',
    name: 'Faire la litière',
    points: 4,
  },
  {
    id: 'CCC',
    categoryId: '3',
    icon: '🍗',
    name: 'Donner à manger',
    points: 1,
  },
  {
    id: 'DDD',
    categoryId: '3',
    icon: '🐾',
    name: 'Aller chez le véto',
    points: 2,
  },
]

const CLEAN_TASKS = [
  {
    id: 'AAAA',
    categoryId: '4',
    icon: '🧽',
    name: 'Nettoyer la salle de bain',
    points: 4,
  },
  {
    id: 'BBBB',
    categoryId: '4',
    icon: '🧽',
    name: 'Nettoyer la cuisine',
    points: 4,
  },
  {
    id: 'CCCC',
    categoryId: '4',
    icon: '🧽',
    name: 'Nettoyer la chambre',
    points: 4,
  },
  {
    id: 'DDDD',
    categoryId: '4',
    icon: '🧽',
    name: 'Nettoyer le salon',
    points: 4,
  },
  {
    id: 'EEEE',
    categoryId: '4',
    icon: '🧹',
    name: 'Passer l’aspirateur',
    points: 3,
  },
  {
    id: 'FFFF',
    categoryId: '4',
    icon: '🧹',
    name: 'Faire la poussière',
    points: 3,
  },
]

const CHILDREN_TASKS = [
  {
    id: 'AAAAA',
    categoryId: '5',
    icon: '🍼',
    name: 'Faire à manger',
    points: 2,
  },
  {
    id: 'BBBBB',
    categoryId: '5',
    icon: '🏫',
    name: 'Emmener à l’école',
    points: 3,
  },
  {
    id: 'CCCCC',
    categoryId: '5',
    icon: '🧹',
    name: 'Ranger le bazar',
    points: 1,
  },
  {
    id: 'DDDDDD',
    categoryId: '5',
    icon: '🧸',
    name: 'Coucher les enfants',
    points: 3,
  },
  {
    id: 'EEEEE',
    categoryId: '5',
    icon: '📚',
    name: 'Faire les devoirs',
    points: 3,
  },
  {
    id: 'FFFFF',
    categoryId: '5',
    icon: '🌡',
    name: 'Aller chez le médecin',
    points: 3,
  },
]

const LOVE_TASK = [
  {
    id: 'AAAAAA',
    categoryId: '6',
    icon: '🥐',
    name: 'Je t’ai fais le petit dej au lit',
    points: 3,
  },
  {
    id: 'BBBBBB',
    categoryId: '6',
    icon: '🎟',
    name: 'Allez on sort !',
    points: 2,
  },
  {
    id: 'CCCCCC',
    categoryId: '6',
    icon: '⛲️',
    name: 'Week-end à...',
    points: 5,
  },
  {
    id: 'DDDDDD',
    categoryId: '6',
    icon: '🏋🏼‍♀️',
    name: 'J’ai fais du sport !',
    points: 2,
  },
  {
    id: 'EEEEEE',
    categoryId: '6',
    icon: '🏝',
    name: 'J’ai prévu les vacances',
    points: 4,
  },
]

export const TASKS: Task[] = [
  ...HOUSE_TASKS,
  ...FOOD_TASKS,
  ...ANIMAL_TASKS,
  ...CLEAN_TASKS,
  ...CHILDREN_TASKS,
  ...LOVE_TASK,
]

export const USER_A = {
  id: '0000',
  firstname: 'Mathieu',
}

export const RELATION_TASKS: RelationTask[] = [
  {
    id: 'X',
    userId: USER_A.id,
    taskId: ANIMAL_TASKS[0].id,
    relationId: 'R',
    createdAt: '',
  },
]
