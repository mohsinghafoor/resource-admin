import { Box, Container, Flex, Spinner, SpinnerProps, Stack } from "@chakra-ui/react"

import { useEffect } from "react"
import { useHistory } from "react-router"
import { useRecoilState } from "recoil"
import Pagination from "../../../components/Pagination"
import { PurpleBackdrop } from "../../../components/PurpleBackdrop"
import { useSearchListingsQuery } from "../../../generated/graphql"
import { listingQuerySelector } from "../../../store/listing"
import { getAlgoliaFilterString } from "../utils/listingQueryBuilder"
import { DirectoryGrid } from "./DirectoryGrid"
import { ListingFulfillmentFilter, ListingTypeFilter } from "./ListingFilters"
import ListingSearchBar from "./ListingSearchBar"

export const ListingDirectory = () => {
  const [{ page, pageSize }, setPagination] = useRecoilState(listingQuerySelector)
  const { listings, total, loading, called } = useListingDirectoryData()
  const tabsRef = document.getElementById("tabs-ref")
  const history = useHistory()

  const changePage = (page: number) => history.push({ search: `?page=${page}` })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get("page") ?? "0")
    // console.log(page)

    setPagination((prevState) => ({ ...prevState, page }))
    tabsRef?.scrollIntoView() // scroll to top on component mount
  }, [])

  return (
    <>
      <Container maxW="container.xl" px={{ base: 0, md: 5 }} pt="5">
        <Stack
          w="full"
          mb={12}
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "flex-end" }}
          spacing={4}
        >
          <ListingSearchBar w={{ base: "320px", md: "initial" }} flexGrow={1} />
          <Flex>
            <ListingTypeFilter mx={1} />
            <ListingFulfillmentFilter mx={1} />
          </Flex>
          <Box {...spinnerStyles}>
            <Spinner visibility={loading ? "visible" : "hidden"} />
          </Box>
          <Pagination
            total={total}
            current={page}
            pageSize={pageSize}
            handleChange={changePage}
            pt={{ base: 4, md: "initial" }}
            w={{ base: "initial", md: "350px" }}
            ml={{ base: 0, md: "auto !important" }}
            mr={{ base: 0, md: "24px !important" }}
            pb={1}
          />
        </Stack>
      </Container>
      <PurpleBackdrop bgColor={{ base: "white", sm: "primary.softTransparent" }}>
        <Container maxW="container.xl" px={{ base: 0, md: 6 }}>
          <DirectoryGrid
            total={total}
            current={page}
            called={called}
            items={listings}
            loading={loading}
            pageSize={pageSize}
          />
          <Container marginTop="2em">
            <Pagination
              display={listings.length ? "inherit" : "none"}
              total={total}
              current={page}
              pageSize={pageSize}
              handleChange={changePage}
            />
          </Container>
        </Container>
      </PurpleBackdrop>
    </>
  )
}

const useListingDirectoryData = () => {
  const [{ page, pageSize, searchText, fulfillmentType, types }] =
    useRecoilState(listingQuerySelector)
  const filterString = getAlgoliaFilterString({ fulfillmentType, types })
  const query = useSearchListingsQuery({
    variables: {
      page: page,
      limit: pageSize,
      query: searchText,
      filters: filterString,
    },
  })

  const listings = query.data?.searchListings.listings ?? []
  const total = query.data?.searchListings.total ?? 0

  return { listings, total, ...query }
}

const spinnerStyles: SpinnerProps = {
  position: { base: "absolute", md: "inherit" },
  top: { base: 0, md: 10 },
  right: { base: 2, md: 10 },
}
