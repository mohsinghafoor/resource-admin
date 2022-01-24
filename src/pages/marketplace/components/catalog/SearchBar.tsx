import { SearchIcon } from "@chakra-ui/icons"
import { BoxProps } from "@chakra-ui/layout"
import { ButtonProps, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react"
import React, { useRef } from "react"
import { useHistory } from "react-router"
import Button from "../../../../components/Button"
import { textStyles } from "../../../../theme/textStyles"

const SearchBar = ({ ...rest }: BoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  const navigate = (searchText?: string) =>
    history.push("/marketplace/listings", { searchText, search: "?page=1" })

  return (
    <Stack spacing={{ base: 2, md: 4 }} direction={{ base: "column", md: "row" }}>
      <InputGroup>
        <InputRightElement>
          <SearchIcon color="white" />
        </InputRightElement>
        <Input
          py={1}
          px={4}
          color="white"
          ref={inputRef}
          variant="unstyled"
          placeholder="Search"
          border="1px solid white"
          {...(textStyles.header as any)}
          _placeholder={{ color: "white" }}
          onKeyPress={(event) => event.key === "Enter" && navigate(inputRef.current?.value)}
        />
      </InputGroup>
      <Button
        alignSelf="flex-end"
        {...catalogButtonStyles}
        onClick={() => navigate(inputRef.current?.value)}
      >
        Search
      </Button>
    </Stack>
  )
}

export const catalogButtonStyles: ButtonProps = {
  bgColor: "white",
  variant: "outline",
  colorScheme: "purple",
  _hover: { shadow: "md" },
  _active: { bg: "gray.300" },
}

export default SearchBar
