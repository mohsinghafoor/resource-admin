/* eslint-disable @typescript-eslint/no-empty-function */
import { useApolloClient } from "@apollo/client"
import {
  Box,
  Container,
  GridItem,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { faBox, faEllipsisH, faMountain, faWrench } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { logger } from "ethers"
import { useEffect, useState } from "react"
import {
  FindBusinessByHandleDocument,
  FindOneListingDocument,
  Listing,
  ListingType,
} from "../../../generated/graphql"
import { useFetchCategories } from "../../../store/category"
import { CreateListingWizard } from "./CreateListingWizard"

interface Props extends Omit<ModalProps, "children"> {
  listing?: Listing
}

const EditListingModal = ({ listing, isOpen, onClose, ...rest }: Props) => {
  const isCentered = useBreakpointValue({ sm: false, md: true })
  const [selectedListingType, setListingType] = useState<ListingType>()
  const client = useApolloClient()
  useFetchCategories()

  const onSave = async () => {
    try {
      await client.refetchQueries({
        include: [FindBusinessByHandleDocument, FindOneListingDocument],
      })
    } catch (e) {
      logger.info(e)
    } finally {
      onClose()
    }
  }

  useEffect(() => {
    setListingType(listing?.type || undefined)
  }, [listing])
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={selectedListingType ? "xl" : "6xl"}
      isCentered={isCentered && !selectedListingType}
    >
      <Box>
        Close
        <ModalOverlay />
        {listing ? (
          <ModalContent
            background={selectedListingType ? "white" : "transparent"}
            justifyContent={"center"}
          >
            <ModalCloseButton />
            <CreateListingWizard
              listing={listing}
              selectedListingType={selectedListingType}
              p={6}
              onCancel={onSave}
              onSave={onSave}
            />
          </ModalContent>
        ) : (
          <ModalContent
            boxShadow={"none"}
            background={selectedListingType ? "white" : "transparent"}
          >
            {!selectedListingType ? (
              <Container
                data-testid="listing_container"
                maxW="container.xl"
                px={{ base: 0, md: "inherit" }}
              >
                <SimpleGrid
                  my={{ base: 10, md: "initial" }}
                  columns={{ sm: 1, md: 3, xl: 3 }}
                  gap={{ base: 4, md: 24 }}
                >
                  {["product", "service", "experience"].map((t) => (
                    <GridItem
                      key={t}
                      m={{ base: 0, md: "initial" }}
                      mx={{ base: 12, md: "initial" }}
                    >
                      <ListingTypeBox
                        type={t as ListingType}
                        setListingType={(selectedType) => setListingType(selectedType)}
                      />
                    </GridItem>
                  ))}
                </SimpleGrid>
              </Container>
            ) : (
              <>
                <ModalCloseButton />
                <CreateListingWizard
                  p={6}
                  onCancel={onSave}
                  onSave={onSave}
                  listing={listing}
                  selectedListingType={selectedListingType}
                  changeListingType={(selectedType) => setListingType(selectedType)}
                />
              </>
            )}
          </ModalContent>
        )}
      </Box>
    </Modal>
  )
}

const ListingTypeBox = ({ type, setListingType }) => {
  const ListingTypeMap = {
    product: {
      title: "Product",
      textlist: ["Food & drink", "Physical goods", "Software", "Merchandise"],
      color: "#957FEF",
      icon: faBox,
    },
    service: {
      title: "Service",
      textlist: ["Consulting", "Repair", "Education", "Freelance work"],
      color: "#F49E4C",
      icon: faWrench,
    },
    experience: {
      title: "Experience",
      textlist: ["Events", "Accomodation & Travel", "VR/AR/MR", "Guided tours"],
      color: "#3772FF",
      icon: faMountain,
    },
  }
  return (
    <Box
      boxShadow={"2xl"}
      rounded={"2xl"}
      overflow={"hidden"}
      background={"white"}
      p={6}
      borderColor={ListingTypeMap[type].color}
      borderWidth="3px"
      minH="240"
      textAlign="center"
      _hover={{ cursor: "pointer", shadow: "lg" }}
      onClick={() => setListingType(ListingType[ListingTypeMap[type].title])}
    >
      <FontAwesomeIcon
        icon={ListingTypeMap[type].icon}
        size="2x"
        color={ListingTypeMap[type].color}
      />
      <Heading data-testid="listing_title" textAlign="center" my="2">
        {ListingTypeMap[type].title}
      </Heading>
      {ListingTypeMap[type].textlist.map((text) => (
        <Text key={text}>{text}</Text>
      ))}
      <Box mt={2}>
        <FontAwesomeIcon icon={faEllipsisH} size="1x" />
      </Box>
    </Box>
  )
}

export default EditListingModal
