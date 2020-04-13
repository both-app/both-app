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

type CategoriesResponse = APIResponse<{ categories: Category[] }>

interface CategoryContextProps {
  categories: Category[]
  getCategoryById: (id: string) => Category | null
}

// @ts-ignore
const CategoryContext = createContext<CategoryContextProps>({})

const CategoryContextProvider: FC = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        data: {
          data: { categories: newCategories },
        },
      } = await api.get<CategoriesResponse>('/categories')

      setItem('categories', newCategories)
      setCategories(newCategories)
    }

    const reHydrateData = async () => {
      const newCategories = await getItem('categories')
      if (newCategories) {
        setCategories(newCategories)
      }

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
