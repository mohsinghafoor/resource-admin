import { Box, Container, Flex, Spinner, SpinnerProps } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import Pagination from "../../../components/Pagination"
import { PurpleBackdrop } from "../../../components/PurpleBackdrop"
import { useSearchBusinessesQuery } from "../../../generated/graphql"
import { businessQuerySelector } from "../../../store/business"
import BusinessSearchBar from "./BusinessSearchBar"
import { DirectoryGrid } from "./DirectoryGrid"

export const BusinessDirectory = () => {
  const [{ page, pageSize }, setPagination] = useRecoilState(businessQuerySelector)
  const { businesses, total, loading, called } = useBusinessDirectoryData()
  const tabsRef = document.getElementById("tabs-ref")
  const history = useHistory()

  const changePage = (page: number) => history.push({ search: `?page=${page}` })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get("page") ?? "0")
    if (!page) return history.replace({ search: `?page=1` })
    setPagination((prevState) => ({ ...prevState, page }))
    tabsRef?.scrollIntoView() // scroll to top on component mount
  }, [history.location.search])

  return (
    <>
      <Container maxW="container.xl" px={{ base: 0, md: 4 }}>
        <Flex w="full" mb={12} direction={{ base: "column", md: "row" }} alignItems="center">
          <BusinessSearchBar />
          <Box {...spinnerStyles}>
            <Spinner visibility={loading ? "visible" : "hidden"} />
          </Box>
          <Pagination
            ml={{ base: "auto" }}
            mr={{ base: "auto", md: 6 }}
            mt={{ base: 5, md: 0 }}
            display={businesses.length ? "inherit" : "none"}
            total={total}
            current={page}
            pageSize={pageSize}
            handleChange={changePage}
          />
        </Flex>
      </Container>
      <PurpleBackdrop>
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <DirectoryGrid
            called={called}
            loading={loading}
            items={businesses}
            type="business"
            total={total}
            current={page}
            pageSize={pageSize}
          />
          <Container marginTop="2em">
            <Pagination
              display={businesses.length ? "inherit" : "none"}
              total={total}
              current={page}
              pageSize={pageSize}
              handleChange={(page) => history.push({ search: `?page=${page}` })}
            />
          </Container>
        </Container>
      </PurpleBackdrop>
    </>
  )
}

const useBusinessDirectoryData = () => {
  const [{ page, pageSize, searchText }] = useRecoilState(businessQuerySelector)
  const query = useSearchBusinessesQuery({
    variables: {
      page,
      limit: pageSize,
      query: searchText,
      filters: "isDisabled:false",
    },
  })
  const businesses = query.data?.searchBusinesses.businesses ?? []
  const total = query.data?.searchBusinesses.total ?? 0

  return { businesses, total, ...query }
}

const spinnerStyles: SpinnerProps = {
  position: { base: "absolute", md: "inherit" },
  right: "0",
  mx: 4,
  mt: 2,
}
