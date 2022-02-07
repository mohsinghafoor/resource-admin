import { atom, selector } from "recoil"
import { ListingType } from "../generated/graphql"
import { FulfillmentType, type2FulfillmentMap } from "../pages/marketplace/utils/types"

interface ListingQueryOptions {
  page: number
  pageSize: number
  searchText: string
  randomPageOffset: number
  types: ListingType[]
  fulfillmentType: FulfillmentType
}

const defaultQueryOptions = {
  page: 1,
  pageSize: 24,
  searchText: "",
  randomPageOffset: 0, // used for randomly selecting which page shows up firs
  types: [],
  fulfillmentType: "Any",
}

export const listingAtom = atom({
  key: "listingAtom",
  default: {
    queryOptions: defaultQueryOptions as ListingQueryOptions,
  },
})

export const iconAtom = atom({
  key: "icomAtom",
  default: "fa fa-area-chart",
})

export const cardDataAtom = atom({
  key: "cardDataAtom",
  default: "",
})
export const replaceCardAtom = atom({
  key: "replaceCardAtom",
  default: "",
})
export const closeModalAtom = atom({
  key: "closeModalAtom",
  default: false,
})

export const listingQuerySelector = selector<ListingQueryOptions>({
  key: "listingQuerySelector",
  get: ({ get }) => get(listingAtom).queryOptions,
  set: ({ set }, newValue) => {
    set(listingAtom, (prevState) => ({ ...prevState, queryOptions: newValue } as any))
  },
})

export const fulfillmentTypesSelector = selector<FulfillmentType[]>({
  key: "fulfillmentTypesSelector",
  get: ({ get }) => {
    const { types } = get(listingAtom).queryOptions
    const selectedType = types[0] ?? "Any"
    return type2FulfillmentMap[selectedType] ?? type2FulfillmentMap["Any"]
  },
})
