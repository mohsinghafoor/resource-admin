import { SearchIcon } from "@chakra-ui/icons"
import { Box, BoxProps, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { debounce } from "lodash"
import { useCallback, useState } from "react"
import { useSetRecoilState } from "recoil"
import { businessQuerySelector } from "../../../store/business"

const defaultStyles: BoxProps = {
  w: { base: "256px", md: 400 },
  mx: { base: "auto", md: "initial" },
}

const BusinessSearchBar = (boxProps: BoxProps) => {
  const setBusinessQuery = useSetRecoilState(businessQuerySelector)
  const [localText, setLocalText] = useState("")

  const search = useCallback(
    (text: string) => {
      const options = { page: 1, searchText: text }
      setBusinessQuery((prevState) => ({ ...prevState, ...options }))
    },
    [setBusinessQuery],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(search, 750), [search])

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") search(localText)
  }

  return (
    <Box {...defaultStyles} {...boxProps}>
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
          placeholder={`Search businesses`}
          value={localText}
        />
      </InputGroup>
    </Box>
  )
}

export default BusinessSearchBar
