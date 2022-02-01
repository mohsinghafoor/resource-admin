import { Container, Heading, VStack } from "@chakra-ui/react"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory } from "react-router"

import Button from "./Button"

export const EndOfResults = () => {
  const history = useHistory()

  return (
    <Container maxW="container.xl">
      <VStack>
        <Heading textAlign="center" size="title">
          Not finding what you need?
        </Heading>
        <Heading textAlign="center" size="header" color="gray.700">
          Submit a request and we'll do the rest!
        </Heading>
        <Button
          rightIcon={<FontAwesomeIcon icon={faComment} />}
          variant="primary"
          colorScheme="primary"
          onClick={() => history.push("/request-products")}
        >
          Tell us what you need
        </Button>
      </VStack>
    </Container>
  )
}
