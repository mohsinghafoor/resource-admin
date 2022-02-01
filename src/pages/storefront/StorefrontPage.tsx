import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Stack,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import SplashPage from "../../components/SplashPage"
import { Business, Listing, useFindBusinessByHandleQuery } from "../../generated/graphql"
import { cardStyles } from "../marketplace/components/BusinessCard"
import { ListingCard } from "../marketplace/components/ListingCard"
import EditListingModal from "./components/EditListingModal"

export const coverStyles = {
  objectFit: "cover" as any,
  h: { base: "120px", md: "300px" },
  w: "full",
}

export const StorefrontPage = () => {
  const { listings, loading } = useGetStorefrontData()
  const containerRef = useRef<HTMLDivElement>(null)

  if (loading) {
    return <SplashPage />
  }

  return (
    <Box ref={containerRef}>
      <ListingList listings={listings} />
    </Box>
  )
}

interface Props extends BoxProps {
  listings: Listing[]
}

export const ListingList = ({ listings, ...rest }: any) => {
  return (
    <>
      <Box {...rest} w="216px" h="300px">
        {<AddListingCard />}
        {listings?.map((listing, index) => (
          <ListingCard data-testid="listing_card" key={index} listing={listing} />
        ))}
      </Box>
    </>
  )
}

const useGetStorefrontData = () => {
  const { handle } = useParams<{ handle: string }>()
  const { data, ...rest } = useFindBusinessByHandleQuery({ variables: { handle } })

  const fetchedBusiness = (data?.findOneBusinessByHandle ?? {}) as Business

  const listings = (fetchedBusiness?.listings ?? []) as Listing[]

  return { listings, ...rest }
}

export const AddListingCard = ({ ...rest }: BoxProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isMobile = useBreakpointValue({ base: true, sm: false })

  if (isMobile)
    return (
      <HStack
        h="130px"
        border="1px dashed"
        rounded="12px"
        mb={4}
        shadow="none"
        justifyContent="center"
        onClick={onOpen}
        mx={2}
      >
        <Box as="span">
          <Heading mx={2} display="inline" color="gray.700" size="subheader">
            Add new listing
          </Heading>
          <FontAwesomeIcon color="gray" icon={faPlus} />
        </Box>

        {isOpen && <EditListingModal isOpen={isOpen} onClose={onClose} />}
      </HStack>
    )

  return (
    <>
      <VStack
        {...cardStyles}
        rounded="12px"
        h="301px"
        p={4}
        shadow="none"
        cursor="pointer"
        border="1px dashed"
        borderColor="gray.700"
        onClick={onOpen}
      >
        <Box h="140px" borderRadius="lg" border="1px dashed" borderColor="gray.700" width="full" />
        <Stack pt={4} align={"center"}>
          <Heading
            data-testid="add_new_listing"
            color="gray.700"
            size="subheader"
            textAlign="center"
          >
            Add new listing
          </Heading>
        </Stack>
        <Flex w="full" mt="auto !important" justify="flex-end">
          <FontAwesomeIcon color="gray" icon={faPlus} />
        </Flex>
      </VStack>
      {isOpen && <EditListingModal isOpen={isOpen} onClose={onClose} />}
    </>
  )
}
