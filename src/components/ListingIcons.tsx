import { BoxProps, Center } from "@chakra-ui/react"
import {
  faBox,
  faEllipsisH,
  faGlobe,
  faGlobeAmericas,
  faMapPin,
  faMountain,
  faRandom,
  faShoppingBag,
  faTruck,
  faUser,
  faWrench,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { FulfillmentType } from "../pages/marketplace/utils/types"

interface TypeIconProps extends BoxProps {
  type?: string
  color?: string
}

export const categoryIconMap = {
  experience: faMountain,
  product: faBox,
  service: faWrench,
  any: faRandom,
}

export const ListingTypeIcon = ({ type, color, ...rest }: TypeIconProps) => {
  return (
    <Center w="22px" {...rest}>
      <FontAwesomeIcon
        color={color ?? "gray"}
        icon={categoryIconMap[type?.toLocaleLowerCase() ?? ""] ?? faEllipsisH}
      />
    </Center>
  )
}

interface FulfillmentIconProps extends BoxProps {
  type: FulfillmentType
  color?: string
}

export const fulfillmentIconMap: Record<FulfillmentType, IconDefinition> = {
  "In-person": faUser,
  "Pick-up": faShoppingBag,
  Delivery: faTruck,
  Remote: faGlobeAmericas,
  Virtual: faGlobe,
  Local: faMapPin,
  Any: faRandom,
}

export const FulfillmentTypeIcon = ({ type, color, ...rest }: FulfillmentIconProps) => {
  return (
    <Center w="22px" {...rest}>
      <FontAwesomeIcon color={color ?? "gray"} icon={fulfillmentIconMap[type] ?? faEllipsisH} />
    </Center>
  )
}
