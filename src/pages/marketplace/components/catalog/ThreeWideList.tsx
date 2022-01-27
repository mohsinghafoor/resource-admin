import { Box, Text, Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import React from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import bg5 from "../../assets/bg5.png"
import bg6 from "../../assets/bg6.png"
import bg7 from "../../assets/bg7.png"
import "./style.css"
import { baseThumbnailStyles } from "./foundations"
import { Link } from "react-router-dom"
const Data = [
  { bgImg: bg5, text: "Finance" },
  { bgImg: bg6, text: "Holistic Healing" },
  { bgImg: bg7, text: "Graphic design" },
]

const ThreeWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest}>
      <Heading fontSize="36px" color="#595959" fontWeight="600" py={2} px={4}>
        Top remote services
      </Heading>
      <Flex maxW="100vw" overflowX="auto" pb={3}>
        <HStack px={4} spacing={4} w="fit-content">
          {Data.map((card, index) => (
            <Thumbnail key={index} bgImg={card.bgImg} text={card.text} />
          ))}
        </HStack>
      </Flex>
    </VStack>
  )
}

const Thumbnail = (props) => {
  const { bgImg, text } = props
  return (
    <Flex direction="column" w="415px" className="cursor" justifyContent="flex-end">
      <Image
        src={bgImg}
        border="12px solid transparent"
        borderRadius="22px"
        alt=""
        _hover={{ border: "12px solid #699dff" }}
      />
      <Text fontSize="28px" fontWeight="600" color="#333333" mt="5" ml="2">
        {text}
      </Text>
      <Link to="/admin" className="link" style={{ width: 415, marginBottom: 70 }}>
        Edit List
      </Link>
    </Flex>
  )
}

export default React.memo(ThreeWideList)
