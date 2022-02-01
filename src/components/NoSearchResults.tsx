import { Container, Heading, Image, VStack } from "@chakra-ui/react"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory } from "react-router"

import NothingFound from "../assets/images/nothing-found.png"
import Button from "./Button"

export const NoSearchResults = () => {
  const history = useHistory()
  return (
    <Container maxW="container.xl" pt={100}>
      <VStack>
        <Image maxW="350px" src={NothingFound} alt="Nothing found" />

        <Heading size="title">No results found</Heading>
        <Heading size="header" color="gray.700">
          There are no results based on your search.
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
