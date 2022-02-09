import { Heading, HStack, VStack, Box, Stack } from "@chakra-ui/layout"
import React, { useState } from "react"
import bg5 from "../../assets/bg5.png"
import bg6 from "../../assets/bg6.png"
import bg7 from "../../assets/bg7.png"
import "./style.css"
import { Text, StackProps } from "@chakra-ui/react"
import { baseThumbnailStyles } from "./SharedStyles"
import CloudinaryImage from "../../../../components/CloudinaryImage"
const Data = [
  { bgImg: bg5, text: "Finance" },
  { bgImg: bg6, text: "Holistic Healing" },
  { bgImg: bg7, text: "Graphic design" },
]

const ThreeWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest} width="full" overflowX="auto">
      <Heading className="heading" fontSize="36px" color="#595959" fontWeight="600" py={2} px={4}>
        Small business starter packs
      </Heading>
      <Box overflowX="auto" pb={3}>
        <HStack px={4} spacing={6} w="fit-content">
          {Data.map((card, index) => (
            <Thumbnail key={index} bgImg={card.bgImg} text={card.text} />
          ))}
        </HStack>
      </Box>
    </VStack>
  )
}

const Thumbnail = (props) => {
  const { bgImg, text } = props
  const [hover, setHover] = useState(false)
  return (
    <VStack
      className="cursor"
      to={`/list/edit`}
      w={{ base: "260px", md: "410px" }}
      align="flex-start"
      {...baseThumbnailStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CloudinaryImage
        fit="cover"
        borderRadius="25px"
        quality="low"
        w="full"
        h={{ base: "200px", md: "260px" }}
        src={bgImg}
        _hover={{ shadow: "lg", border: "12px solid #699dff" }}
        border="12px solid transparent"
      />
      <Stack
        className="edit"
        {...StackStyles}
        color={hover ? "white" : "transparent"}
        bg={hover ? "rgba(255, 255, 255, 0.15)" : "transparent"}
      >
        <Text>EDIT LIST</Text>
      </Stack>
      <Heading fontSize="28px" color="#333333" fontWeight="600">
        {text}
      </Heading>
    </VStack>
  )
}

export default React.memo(ThreeWideList)

const StackStyles: StackProps = {
  // pos: "absolute",
  w: "97%",
  px: "5",
  ml: "5",
  h: "53px",
  justifyContent: "center",
  align: "flex-end",
  fontWeight: "400",
  fontSize: "14px",
  fontFamily: "Poppins",
}
