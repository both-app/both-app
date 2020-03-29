import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { colors } from 'res/colors'

const CATEGORIES: Category[] = [
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

interface CategoryContextProps {
  categories: Category[]
  getCategoryById: (id: string) => Category | null
}

const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  // @ts-ignore
  getCategoryById: () => {},
})

const CategoryContextProvider: FC = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = () => {
      setCategories(CATEGORIES)
    }

    fetchCategories()
  }, [])

  const getCategoryById = (categoryId: string) => {
    return categories.find(({ id }) => id === categoryId)
  }

  const categoryContextApi = useMemo(
    () => ({
      categories,
      getCategoryById,
    }),
    [categories, getCategoryById]
  )

  return (
    <CategoryContext.Provider value={categoryContextApi}>
      {children}
    </CategoryContext.Provider>
  )
}

export { CategoryContext, CategoryContextProvider }
