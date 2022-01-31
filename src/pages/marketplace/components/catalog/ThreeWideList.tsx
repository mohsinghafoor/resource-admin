import { Text, Stack, Heading, HStack, VStack, Box, Center, AspectRatio } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import React from "react"
import bg5 from "../../assets/bg5.png"
import bg6 from "../../assets/bg6.png"
import bg7 from "../../assets/bg7.png"
import "./style.css"
import { Link } from "react-router-dom"
import { baseThumbnailStyles } from "./foundations"
import CloudinaryImage from "../../../../components/CloudinaryImage"
const Data = [
  { bgImg: bg5, text: "Finance" },
  { bgImg: bg6, text: "Holistic Healing" },
  { bgImg: bg7, text: "Graphic design" },
]

const ThreeWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest} width="full" overflowX="auto">
      <Heading fontSize="36px" color="#595959" fontWeight="600" py={2} px={4}>
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
  return (
    <VStack
      to={`/marketplace/list/${text}`}
      w={{ base: "260px", md: "410px" }}
      align="flex-start"
      {...baseThumbnailStyles}
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
      <Heading fontSize="28px" color="#333333" fontWeight="600">
        {text}
      </Heading>
    </VStack>
  )
}

export default React.memo(ThreeWideList)
