import { Box, Heading, HStack, VStack, Flex } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import React from "react"
const Data = [{ text: "Business owner" }, { text: "Team members" }]

const OwnerType = ({ ...rest }: any) => {
  return (
    <HStack align="center" h="69px" bg="#F2F2F2" pl="5">
      {Data.map((card, index) => (
        <CustomizeButton key={index} text={card.text} />
      ))}
    </HStack>
  )
}

const CustomizeButton = (props) => {
  const { text } = props
  return (
    <Button
      bg="#F2F2F2"
      color="#595959"
      fontSize="14px"
      fontWeight="400"
      borderRadius="18.5px"
      _hover={{ bg: "#7161EF", color: "white" }}
    >
      {text}
    </Button>
  )
}

export default OwnerType
