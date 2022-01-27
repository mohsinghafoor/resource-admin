import { Center, AspectRatio, Box, Heading, HStack, VStack, Flex } from "@chakra-ui/layout"
import React from "react"
import { FaCalculator, FaMountain, FaPalette, FaUserTie } from "react-icons/fa"
import bg1 from "../../assets/bg1.png"
import bg2 from "../../assets/bg2.png"
import bg3 from "../../assets/bg3.png"
import "./style.css"
import { baseThumbnailStyles } from "./foundations"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Link } from "react-router-dom"
const Data = [
  { bgImg: bg1, icon: <FaPalette />, text: "Upgrade your brand" },
  { bgImg: bg2, icon: <FaCalculator />, text: "Manage your finances" },
  { bgImg: bg3, icon: <FaMountain />, text: "Take a day off" },
  { bgImg: bg3, icon: <FaUserTie />, text: "Learn from pros" },
]

const FourWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest} width="full">
      <Heading fontSize="36px" color="#595959" fontWeight="600" py={2} px={4}>
        Small business starter packs
      </Heading>
      <Box maxW="100vw" overflowX="auto" pb={3}>
        <HStack px={4} spacing={6} w="fit-content">
          {Data.map((card, index) => (
            <Thumbnail key={index} bgImg={card.bgImg} text={card.text} icon={card.icon} />
          ))}
        </HStack>
      </Box>
    </VStack>
  )
}

const Thumbnail = (props) => {
  const { bgImg, icon, text } = props
  return (
    <AspectRatio
      className="cursor"
      w={{ base: "200px", md: "303px" }}
      border="12px solid transparent"
      borderRadius="16px"
      _hover={{ shadow: "lg", border: "12px solid #699dff" }}
      ratio={1}
    >
      <Center position="relative">
        <CloudinaryImage
          w="full"
          h="full"
          fit="cover"
          zIndex={-1}
          rounded="2xl"
          quality="good"
          position="absolute"
          src={bgImg}
          filter="brightness(80%)"
        />
        <VStack>
          <Box fontSize="36px" color="white" mb="5">
            {icon}
          </Box>
          <Heading color="white" size="header" textAlign="center">
            {text}
          </Heading>
          <Link to="" className="link" style={{ marginTop: 130 }}>
            Edit List
          </Link>
        </VStack>
      </Center>
    </AspectRatio>
  )
}

export default React.memo(FourWideList)
