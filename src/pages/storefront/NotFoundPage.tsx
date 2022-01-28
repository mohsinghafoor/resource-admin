import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Container, Heading, VStack } from "@chakra-ui/layout"
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory } from "react-router"
import businessNotActive from "../../assets/notFound/business-not-active.svg"
import listingNotAvailable from "../../assets/notFound/listing-not-available.svg"

type ResourceType = "business" | "listing" | "transaction"
interface Props {
  resourceType: ResourceType
  title?: string
}

const NotFoundPage = ({ resourceType, title }: Props) => {
  const { image, buttonText, defaultTitle, path, icon } = contentMap[resourceType] || defaultContent
  const history = useHistory()

  return (
    <Container alignItems="center">
      <VStack justify="center" minH="80vh" spacing={4}>
        <Image src={image} pb={4} />
        <Heading textAlign="center" size="title">
          {title || defaultTitle}
        </Heading>
        <Button
          mt={2}
          colorScheme="primary"
          variant="secondary"
          leftIcon={<FontAwesomeIcon icon={icon || faSearch} color="inherit" />}
          onClick={() => history.push(path)}
        >
          {buttonText}
        </Button>
      </VStack>
    </Container>
  )
}

const contentMap = {
  transaction: {
    image: listingNotAvailable,
    defaultTitle: "Transaction not found",
    buttonText: "Back to wallet",
    icon: faArrowLeft,
    path: "/wallet",
  },
  listing: {
    image: listingNotAvailable,
    defaultTitle: "Listing not found",
    buttonText: "Browse the marketplace",
    path: "/marketplace",
    icon: faSearch,
  },
  business: {
    image: businessNotActive,
    defaultTitle: "Business not found",
    buttonText: "Browse the marketplace",
    path: "/marketplace",
    icon: faSearch,
  },
}

const defaultContent = {
  image: listingNotAvailable,
  defaultTitle: "Resource not found",
  buttonText: "Browse the marketplace",
  path: "/marketplace",
  icon: faSearch,
}

export default NotFoundPage
