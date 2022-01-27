import { Spacer, Flex, StackProps, VStack, HStack } from "@chakra-ui/layout"
import { Image, Text } from "@chakra-ui/react"
import logo from "../assets/logotype.svg"
import Counter from "../services/auth/Counter"
import { useHistory } from "react-router-dom"
import { useIsOnboarding } from "./foundations"
export const Header = () => {
  const containerStyles: StackProps = {
    px: { base: 4, md: 6 },
    py: { base: 1, md: 2 },
    borderBottom: "solid 1px",
    borderColor: "gray.300",
    position: "sticky",
    bgColor: "white",
  }

  return (
    <Flex {...containerStyles}>
      <VStack align="flex-start">
        <Image src={logo} width="150px" _hover={{ cursor: "pointer" }} />
        <Text fontFamily="Poppins" fontSize="10px" color=" #8C8C8C">
          Admin
        </Text>
      </VStack>
      <Spacer />

      <HStack>
        <Text color="#8C8C8C" fontSize="12px">
          Your session expires in
        </Text>
        <Counter />
      </HStack>
    </Flex>
  )
}

export default Header
