import React, {
  FC,
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

import { api, APIResponse } from 'res/api'
import { setItem, getItem } from 'res/storage'
import { getNativeEmoji } from 'res/emoji'

type CategoriesResponse = APIResponse<{ categories: Category[] }>

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
    const fetchCategories = async () => {
      const result = await api.get<CategoriesResponse>('/categories')

      const newCategories = result.data.data.categories.map((category) => ({
        ...category,
        emoji: getNativeEmoji(category.emoji),
      }))

      setItem('categories', newCategories)
      setCategories(newCategories)
    }

    const reHydrateData = async () => {
      const newCategories = await getItem('categories')
      setCategories(newCategories)
      fetchCategories()
    }

    reHydrateData()
  }, [])

  const getCategoryById = useCallback(
    (categoryId: string) => categories.find(({ id }) => id === categoryId),
    [categories]
  )

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
