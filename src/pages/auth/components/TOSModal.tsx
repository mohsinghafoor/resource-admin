import {
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import React from "react"
import Button from "../../../components/Button"

interface TOSModalProps {
  isOpen: boolean
  onClose: () => void
  handleAcceptTOS: () => void
}

export const TOSModal = ({ isOpen, onClose, handleAcceptTOS }: TOSModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms of service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList>
            <ListItem>
              <Text>Agree to price your goods & services the same as priced in USD.</Text>
              <Text fontStyle="italic">
                If you sell your space for $150/hr, you must price as R$150
              </Text>
            </ListItem>
            {/* <Text mt="1em" fontWeight="bold">
              30/60/90
            </Text>

            <ListItem>
              <Text>30 days: pay 10% of balance each month. if not paid, 2.5% interest starts</Text>
            </ListItem>
            <ListItem>
              <Text>
                60: stale debt, last month due +2.5%, THIS month due, and warning about pending doom
                of debt collection and/or debit of bank account
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                90 days, bank account gets debited for USD amount OR goes to debt collection,
                impacting US Credit score
              </Text>
            </ListItem>
            <Text mt="1em" fontWeight="bold"></Text> */}
            <ListItem>
              <Text>You are above the age of 18</Text>
            </ListItem>
          </UnorderedList>
          <Text mt="4" float={"right"}>
            View Full
            <Link ml={2} href={"https://www.resourcenetwork.co/"} color="alternate.main" isExternal>
              Terms of service
            </Link>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button data-testid="accept" colorScheme="primary" onClick={handleAcceptTOS}>
            Accept Terms of Service
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
