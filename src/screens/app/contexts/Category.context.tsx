import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { CATEGORIES } from 'res/fixtures'

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
