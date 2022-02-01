import { ListingType } from "../../../generated/graphql"
import { ListingTypeWithAny } from "../components/ListingFilters"

export type FulfillmentType =
  | "Virtual"
  | "Delivery"
  | "Remote"
  | "In-person"
  | "Pick-up"
  | "Local"
  | "Any"

type ListingTypeKey = "Product" | "Service" | "Experience" | "Any"
export const type2FulfillmentMap: Record<ListingTypeKey, FulfillmentType[]> = {
  Product: ["Any", "Delivery", "Pick-up"],
  Service: ["Any", "Virtual", "In-person"],
  Experience: ["Any", "Virtual", "In-person"],
  Any: ["Any", "Local", "Remote"],
}

export const getCorrespondingFulfillmentType = (
  type: ListingTypeWithAny,
  fulfillment: FulfillmentType,
): FulfillmentType => {
  if (fulfillment === "Any") return "Any"
  if (["Delivery", "Virtual", "Remote"].includes(fulfillment)) {
    if (type === "Any") return "Remote"
    return type === ListingType.Product ? "Delivery" : "Virtual"
  }
  if (["Pick-up", "In-person", "Local"].includes(fulfillment)) {
    if (type === "Any") return "Local"
    return type === ListingType.Product ? "Pick-up" : "In-person"
  }
  return "Any"
}
