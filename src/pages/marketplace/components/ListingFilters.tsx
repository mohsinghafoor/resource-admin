import {
  Box,
  BoxProps,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { FulfillmentTypeIcon, ListingTypeIcon } from "../../../components/ListingIcons"
import { MenuButton } from "../../../components/Menu"
import { ListingType } from "../../../generated/graphql"
import {
  fulfillmentTypesSelector,
  listingQuerySelector as querySelector,
} from "../../../store/listing"
import { FulfillmentType, getCorrespondingFulfillmentType } from "../utils/types"

export type ListingTypeWithAny = ListingType | "Any"
const types = ["Any", ...Object.keys(ListingType)]

export const ListingTypeFilter = (props: BoxProps) => {
  const [{ types: selectedTypes, fulfillmentType }, setListingQuery] = useRecoilState(querySelector)
  const selectedType = selectedTypes[0]

  const handleSelect = (type: ListingTypeWithAny) => {
    if (type === selectedType) return
    const newFulfillmentType = getCorrespondingFulfillmentType(type, fulfillmentType)
    setListingQuery((prev) => ({
      ...prev,
      page: 1,
      types: type === "Any" ? [] : [type],
      fulfillmentType: newFulfillmentType ?? "Any",
    }))
  }

  return (
    <Box {...props}>
      <Text mx={3} mb={2}>
        Type
      </Text>
      <Menu autoSelect={false} {...props}>
        {({ isOpen }) => (
          <>
            <MenuButton
              minW="170px"
              isOpen={isOpen}
              leftIcon={<ListingTypeIcon type={selectedType ?? "Any"} />}
            >
              {selectedType ?? "Any"}
            </MenuButton>
            <MenuList>
              <MenuGroup title="Listing type">
                <MenuDivider />
                {types.map((type: any) => (
                  <MenuItem key={type} onClick={() => handleSelect(type)}>
                    {type}
                    <ListingTypeIcon type={type} />
                  </MenuItem>
                ))}
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  )
}

export const ListingFulfillmentFilter = ({ ...rest }: BoxProps) => {
  const [{ fulfillmentType }, setListingQuery] = useRecoilState(querySelector)
  const availableFulfillmentTypes = useRecoilValue(fulfillmentTypesSelector)

  const handleSelect = (type: FulfillmentType) => {
    if (type === fulfillmentType) return
    setListingQuery((prev) => ({ ...prev, page: 1, fulfillmentType: type }))
  }

  return (
    <Box {...rest}>
      <Text mx={3} mb={2}>
        Fulfillment
      </Text>
      <Menu autoSelect={false} {...rest}>
        {({ isOpen }) => (
          <>
            <MenuButton
              minW="150px"
              leftIcon={<FulfillmentTypeIcon type={fulfillmentType} />}
              isOpen={isOpen}
            >
              {fulfillmentType}
            </MenuButton>
            <MenuList>
              <MenuGroup title="Fulfillment">
                <MenuDivider />
                {availableFulfillmentTypes.map((type) => {
                  return (
                    <MenuItem key={type} onClick={() => handleSelect(type)}>
                      {type}
                      <FulfillmentTypeIcon type={type} />
                    </MenuItem>
                  )
                })}
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  )
}
