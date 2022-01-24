import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useHistory, useLocation } from "react-router-dom"
import Button from "./Button"

const CallToActionModal = ({ isOpen, onClose }) => {
  const history = useHistory()
  const location = useLocation()
  const navigateTo = (url: string) => {
    history.push(url, { from: location })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="1em">
        <ModalHeader>Trade it up!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Exchange your products and services without spending a dime.</Text>
        </ModalBody>
        <ModalFooter>
          <Button mx={1} variant="outline" colorScheme="blue" onClick={() => navigateTo("/")}>
            log in
          </Button>
          <Button
            mx={1}
            variant="primary"
            colorScheme="blue"
            onClick={() => navigateTo("/register")}
          >
            sign up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CallToActionModal
