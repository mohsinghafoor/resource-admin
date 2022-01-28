import { atom, selector, selectorFamily, useSetRecoilState } from "recoil"
import { ListingCategory, useFindAllCategoriesQuery } from "../generated/graphql"

export const categoryAtom = atom({
  key: "categoryAtom",
  default: {
    total: 0,
    loading: false,
    categories: [] as ListingCategory[],
    allCategories: [] as ListingCategory[],
  },
})

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: ({ get }) =>
    get(categoryAtom).allCategories.map((category) => ({
      value: category.id,
      label: category.name,
      icon: category.icon,
      parent: category.parent,
    })),
})

export const categoryByIdSelector = selectorFamily({
  key: "categoryByIdSelector",
  get:
    (id) =>
    ({ get }) =>
      get(categoryAtom).allCategories.find((o, index) => o.id === id) ?? ({} as ListingCategory),
})

export const subCategoriesSelector = selectorFamily({
  key: "subCategoriesSelector",
  get:
    (parentId: string) =>
    ({ get }) => {
      const parentCategory = get(categoryAtom).categories.find(
        (category) => category.id === parentId,
      )
      if (!parentCategory?.subcategories) return []
      return parentCategory.subcategories.map((category) => {
        return {
          value: category?.id,
          label: category?.name,
          icon: category?.icon,
          parent: category?.parent?.name,
        }
      })
    },
})

export const useFetchCategories = () => {
  const setCategoriesState = useSetRecoilState(categoryAtom)
  useFindAllCategoriesQuery({
    variables: { page: 0, limit: 225 },
    onCompleted: ({ findManyCategory }) => {
      const categories =
        findManyCategory?.categories?.filter((category) => category?.parent === null) ?? ([] as any)

      setCategoriesState({
        total: findManyCategory?.total ?? 0,
        categories: categories,
        allCategories: findManyCategory?.categories ?? ([] as any),
        loading: false,
      })
    },
  })
}
