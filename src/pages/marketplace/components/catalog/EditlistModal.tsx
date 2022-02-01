import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Button, useDisclosure } from "@chakra-ui/react"
import DirectoriesPage from "../DirectoriesPage"
import { ListingDirectory } from "../ListingDirectory"

function EditlistModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        onClick={onOpen}
        color="transparent"
        bg="transparent"
        borderRadius="0px"
        mr="20px"
        w="120px"
        fontWeight="300"
        _hover={{ bg: "#333333", color: "white" }}
      >
        Edit List
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ListingDirectory />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default EditlistModal