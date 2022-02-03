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
import { cardStyles } from "../BusinessCard"
import EditlistModal from "./EditlistModal"

export const coverStyles = {
  objectFit: "cover" as any,
  h: { base: "120px", md: "300px" },
  w: "full",
}
export const AddListing = ({ ...rest }: BoxProps) => {
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

        {isOpen && <EditlistModal />}
      </HStack>
    )

  return (
    <>
      <VStack
        {...cardStyles}
        rounded="12px"
        h="301px"
        w="216px"
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
      {isOpen && <EditlistModal isOpen={isOpen} onClose={onClose} />}
    </>
  )
}
