import { Box, BoxProps, Text } from "@chakra-ui/layout"
import { Avatar, Center } from "@chakra-ui/react"
import { faQrcode, faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import QRCodeReact from "qrcode.react"
import React, { useEffect, useState } from "react"
import Button from "../../../components/Button"
import { Business } from "../../../generated/graphql"

interface Props extends BoxProps {
  business: Business
  isOpen?: boolean
  withButton?: boolean
}

const QRCode = ({ business, isOpen = false, withButton = true, ...rest }: Props) => {
  const [showQr, setShowQr] = useState(isOpen)

  return (
    <Box {...rest}>
      {showQr ? (
        <>
          <Center
            p={6}
            rounded="xl"
            boxShadow="md"
            _hover={{ cursor: "pointer" }}
            onClick={() => setShowQr(false)}
          >
            <QRCodeReact value={window.location.href} />
            <Avatar position="absolute" size="sm" src={business.logoUrl || ""} alt={"Logo"} />
          </Center>
          <Text variant="caption" color="gray.500" w="full" textAlign="center" mt={2}>
            Scan to share
          </Text>
        </>
      ) : withButton ? (
        <>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Button bgColor="gray.700" onClick={() => setShowQr(true)}>
              <FontAwesomeIcon icon={faQrcode} />
            </Button>
            <Text variant="caption" color="gray.500" w="full" textAlign="center" mt={2}>
              Share code
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Button
            size={"sm"}
            colorScheme={"gray"}
            rightIcon={<FontAwesomeIcon icon={faShare} />}
            onClick={() => setShowQr(true)}
          >
            Share
          </Button>
        </>
      )}
    </Box>
  )
}

export default QRCode
