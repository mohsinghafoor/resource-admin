import { ListingType, ListingWhereInput } from "../../../generated/graphql"
import { FulfillmentType } from "./types"

export const getTypeFilter = (types: ListingType[]): ListingWhereInput => {
  if (types.length === 0) return {}
  const typesMappedToUpper = types.map((t) => t.toUpperCase())
  return { type: { in: typesMappedToUpper } }
}

export const getFulfillmentTypeFilter = (fulfillmentType: FulfillmentType): ListingWhereInput => {
  if (fulfillmentType === "Any") {
    return {}
  }
  if (["In-person", "Pick-up", "Local"].includes(fulfillmentType)) {
    return { isLocal: true }
  }
  if (["Delivery", "Virtual", "Remote"].includes(fulfillmentType)) {
    return { isVirtual: true }
  }
  return {}
}

export const getAlgoliaFilterString = ({ fulfillmentType, types }) => {
  const upperCaseType = types[0] ? types[0].toString().toUpperCase() : null
  const typeString = upperCaseType ? `type:${upperCaseType}` : ""

  const fulfillmentFilter = getFulfillmentTypeFilter(fulfillmentType)
  const keys = Object.keys(fulfillmentFilter)
  const fulfillmentString = keys.length ? `${keys[0]}:${fulfillmentFilter[keys[0]]}` : ""

  let filterString = "isDisabled:false"

  if (typeString && fulfillmentString)
    filterString += " AND " + typeString + " AND " + fulfillmentString
  else if (typeString) filterString += " AND " + typeString
  else if (fulfillmentString) filterString += " AND " + fulfillmentString

  return filterString
}
