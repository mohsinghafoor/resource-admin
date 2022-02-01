import { atom, selector } from "recoil"

interface BusinessQueryOptions {
  page: number
  pageSize: number
  searchText: string
  randomPageOffset: number
}

const defaultQueryOptions = {
  page: 1,
  pageSize: 24,
  searchText: "",
  randomPageOffset: 0, // used for randomly selecting which page shows up first
}

export const businessAtom = atom({
  key: "businessAtom",
  default: {
    queryOptions: defaultQueryOptions as BusinessQueryOptions,
  },
})

export const businessQuerySelector = selector<BusinessQueryOptions>({
  key: "businessQuerySelector",
  get: ({ get }) => get(businessAtom).queryOptions,
  set: ({ set }, newValue) => {
    set(businessAtom, (prevState) => ({ ...prevState, queryOptions: newValue } as any))
  },
})
