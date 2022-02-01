import { Box, GridItem, SimpleGrid } from "@chakra-ui/react"
import { EndOfResults } from "../../../components/EndOfResults"
import { NoSearchResults } from "../../../components/NoSearchResults"
import { Business, Listing } from "../../../generated/graphql"
import colors from "../../../theme/foundations/colors"
import { BusinessCard } from "./BusinessCard"
import { ListingCard } from "./ListingCard"

export const DirectoryGrid = ({ items, type, total, current, pageSize, called, loading }) => {
  const isLastPage = Math.ceil(total / pageSize) === current

  return (
    <>
      {called && !loading && items.length === 0 && <NoSearchResults />}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={{ base: 0, sm: 6 }}>
        {type === "listing" &&
          items.map((listing, index) => <ListingCard key={index} listing={listing as Listing} />)}
        {type === "business" &&
          items.map((business, index) => (
            <Box key={index} p={{ base: 4, sm: 0 }}>
              <BusinessCard key={index} business={business as Business} />
            </Box>
          ))}
      </SimpleGrid>
      {called && isLastPage && items.length > 0 && (
        <SimpleGrid mt="60px" columns={[1]} spacing="40px">
          <GridItem mx={{ base: "auto", md: "inherit" }} />
          <EndOfResults />
        </SimpleGrid>
      )}
    </>
  )
}
