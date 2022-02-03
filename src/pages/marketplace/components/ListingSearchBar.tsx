import { SearchIcon } from "@chakra-ui/icons"
import { Box, BoxProps, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { listingQuerySelector as listingSelector } from "../../../store/listing"
import { cardStyles } from "./BusinessCard"

const ListingSearchBar = (boxProps: BoxProps) => {
  const searchTextFromUrl = useLocation().state?.searchText ?? ""
  const [{ searchText }, setListingQuery] = useRecoilState(listingSelector)
  const [localText, setLocalText] = useState("")

  const search = useCallback(
    (text: string) => {
      setListingQuery((prevState) => ({ ...prevState, page: 1, searchText: text }))
    },
    [setListingQuery],
  )

  useEffect(() => {
    setLocalText(searchText)
  }, [searchText])

  useEffect(() => {
    search(searchTextFromUrl)
  }, [searchTextFromUrl])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(search, 750), [search])

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") search(localText)
  }

  return (
    <Box w={{ base: cardStyles.w, md: "initial" } as any} {...boxProps}>
      <Text mx={3} mb={2}>
        I am looking for...
      </Text>
      <InputGroup>
        <InputLeftElement zIndex={1} pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          onChange={(e) => {
            setLocalText(e.target.value)
            debouncedSearch(e.target.value)
          }}
          onKeyPress={handleKeyPressed}
          placeholder={`Search listings`}
          value={localText}
        />
      </InputGroup>
    </Box>
  )
}

export default ListingSearchBar
