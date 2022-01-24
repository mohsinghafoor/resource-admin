import { Center, Flex, HStack, StackProps, Box, Heading } from "@chakra-ui/layout"
import { Image, Text } from "@chakra-ui/react"
import logo from "../assets/logotype.svg"

import { useIsOnboarding } from "./foundations"
export const Header = () => {
  const containerStyles: StackProps = {
    px: { base: 4, md: 6 },
    py: { base: 1, md: 2 },
    justify: "space-between",
    borderBottom: "solid 1px",
    borderColor: "gray.300",
    position: "sticky",
    bgColor: "white",
    direction: "column",
    zIndex: 100,
    top: "0px",
  }

  return (
    <Flex {...containerStyles}>
      <Image src={logo} width="150px" _hover={{ cursor: "pointer" }} />
      <Text fontFamily="Poppins" fontSize="10px" color=" #8C8C8C">
        Admin
      </Text>
    </Flex>
  )
}

export default Header
