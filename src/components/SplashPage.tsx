import { BoxProps, Center } from "@chakra-ui/layout"
import { Container, Image } from "@chakra-ui/react"
import React from "react"
import logo from "../assets/logotype.svg"

const SplashPage = ({ ...rest }: BoxProps) => {
  return (
    <Container h="100vh" maxW="container.xl" p={0} {...rest}>
      <Center h="full">
        <Image src={logo} width="150px" />
      </Center>
    </Container>
  )
}

export default SplashPage
