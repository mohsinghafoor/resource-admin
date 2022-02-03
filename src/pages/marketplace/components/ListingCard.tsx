import { useApolloClient } from "@apollo/client"
import { Box, BoxProps } from "@chakra-ui/layout"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  Center,
  HStack,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useClipboard,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { faPen, faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import CloudinaryImage from "../../../components/CloudinaryImage"
import GlyphLabel from "../../../components/glyph/GlyphLabel"
import {
  FindBusinessByHandleDocument,
  Listing,
  useToggleListingMutation,
} from "../../../generated/graphql"
import colors from "../../../theme/foundations/colors"
import EditListingModal from "../../storefront/components/EditListingModal"
import { FaRegHeart } from "react-icons/fa"
export interface ListingCardProps extends BoxProps {
  listing: Listing
  layout?: "mobile" | "desktop"
}

export const ListingCard = ({ listing, layout, ...rest }: ListingCardProps) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const listingPath = `/${listing.business?.handle ?? ""}/listing/${listing.id}`
  const fullUrl = `${window.location.origin}${listingPath}`
  const { onCopy } = useClipboard(fullUrl)
  const toast = useToast()
  const Image = () => (
    <CloudinaryImage
      mr="-10px !important"
      w="full"
      h="full"
      pos="absolute"
      fit="cover"
      rounded="8px"
      quality="good"
      src={listing.imageUrl ?? ""}
    />
  )

  const PriceTag = () => {
    return (
      <Center rounded="full" h="30px" px={2} border="1px solid ">
        <GlyphLabel value={listing.cost} size={"sm"} />
      </Center>
    )
  }

  const CopyButton = () => (
    <HStack>
      <IconButton
        size="sm"
        padding="2px !important"
        rounded="full"
        bgColor="white"
        aria-label="share"
        variant="ghost"
        icon={<FontAwesomeIcon icon={faShare} />}
        onClick={(e) => {
          onCopy()
          toast({ description: "Link copied" })
          e.preventDefault()
        }}
      />

      <IconButton
        size="sm"
        padding="2px !important"
        rounded="full"
        bgColor="white"
        aria-label="share"
        variant="ghost"
        icon={<FaRegHeart />}
      />
    </HStack>
  )

  const MobileLayout = () => {
    return (
      <Stack
        direction={"row"}
        as={Link}
        spacing={3}
        px={1}
        py={2}
        borderTop={`1px solid ${colors.gray[500]}`}
        rounded="0px"
        align="stretch"
        to={listingPath}
        _last={{ borderBottom: { base: `1px solid ${colors.gray[500]}`, sm: "initial" } }}
        {...rest}
      >
        <Box
          marginInlineStart="0px !important"
          position="relative"
          minW="120px"
          h={"120px"}
          w={"120px"}
        >
          <Image />
        </Box>
        <VStack w="full" alignItems="stretch" justify="space-between">
          ]
          <Text noOfLines={2} h="40px">
            {listing.title}
          </Text>
          <HStack w="full" justify="space-between">
            <CopyButton />
            <PriceTag />
          </HStack>
        </VStack>
      </Stack>
    )
  }

  const DesktopLayout = () => (
    <Stack
      direction={"column"}
      as={Link}
      spacing={3}
      px={3}
      py={3}
      borderTop="none"
      rounded={"12px"}
      align="stretch"
      to={listingPath}
      border="12px solid transparent"
      w="236px"
      h="341px"
      _hover={{ bgColor: "white", shadow: "md", border: "12px solid #699DFF" }}
      {...rest}
    >
      <Box marginInlineStart="0px !important" h={"220px"} minW="120px" position="relative">
        <Image />

        <HStack
          zIndex={2}
          position={"absolute"}
          left="0px"
          w="150px"
          h="40px"
          bg="rgba(255, 255, 255, 0.9)"
          borderRadius="8px 0px"
        >
          <Text noOfLines={1} variant="caption">
            {listing?.business?.name}
          </Text>
        </HStack>
      </Box>
      <VStack w="full" alignItems="stretch">
        <Text data-testid="listing_card_title" noOfLines={2} h="40px">
          {listing.title}
        </Text>
        <HStack w="full" justify="space-between">
          <CopyButton />
          <PriceTag />
        </HStack>
      </VStack>
    </Stack>
  )

  if (layout === "desktop") return DesktopLayout()
  if (layout === "mobile") return MobileLayout()
  return isMobile ? MobileLayout() : DesktopLayout()
}

export const EditContainer = ({ listing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        px="6px"
        py="1px"
        background="blue.main"
        borderRadius="lg"
        _hover={{ bgColor: "blue.500" }}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        <FontAwesomeIcon size="xs" color="white" icon={faPen} />
      </Box>
      {isOpen && <EditListingModal isOpen={isOpen} onClose={onClose} listing={listing} />}
    </>
  )
}

export const PublishContainer = ({ listing }) => {
  const toast = useToast()
  const client = useApolloClient()
  const publishAlert = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [toggleListing] = useToggleListingMutation()
  const cancelRef = useRef<HTMLButtonElement>(null)
  if (!listing) return null

  const toggleIsDisable = async (listing) => {
    try {
      setIsLoading(true)
      const result = await toggleListing({ variables: { id: listing.id } })
      if (result.errors) return
      await client.refetchQueries({ include: [FindBusinessByHandleDocument] })
      publishAlert.onClose()
      toast({
        title: listing.isDisabled ? "Listing published" : "Listing unpublished",
        description: listing.isDisabled
          ? "Your listing is now live in the marketplace"
          : "Your listing is now hidden from the marketplace",
        status: "success",
      })
    } catch (e) {
      console.log("ListingCard.tsx --  e", e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        aria-label="Toggle disable"
        isLoading={isLoading}
        background={listing.isDisabled ? "white" : "#F49E4C"}
        color={listing.isDisabled ? "#F49E4C" : "white"}
        size="xs"
        border={listing.isDisabled ? "1px solid #F2F2F2" : "none"}
        onClick={(e) => {
          e.preventDefault()
          publishAlert.onOpen()
        }}
      >
        {listing.isDisabled ? "Publish" : "Published"}
      </Button>
      <ConfirmPublish
        isOpen={publishAlert.isOpen}
        isDisabled={listing.isDisabled as boolean}
        leastDestructiveRef={cancelRef}
        onClose={() => publishAlert.onClose()}
        onConfirm={() => toggleIsDisable?.(listing)}
      />
    </>
  )
}

interface AlertProps extends Omit<AlertDialogProps, "children"> {
  onConfirm: any
  isDisabled: boolean
}

const ConfirmPublish = (props: AlertProps) => {
  const { isOpen, onClose, onConfirm, leastDestructiveRef, isDisabled } = props
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {isDisabled ? "Publish listing?" : "Unpublish listing?"}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text display="inline">
              {isDisabled
                ? "Shoppers will be able to view and purchase this listing in the marketplace"
                : "Shoppers will not be able to view this listing in the marketplace"}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" colorScheme="primary" ml={3} onClick={onConfirm}>
              {isDisabled ? "Publish" : "Unpublish"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
