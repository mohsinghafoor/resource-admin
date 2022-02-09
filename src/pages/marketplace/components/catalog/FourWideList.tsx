import { Stack, AspectRatio, Box, Heading, HStack, VStack, Text } from "@chakra-ui/layout"
import React, { useState } from "react"
import { FaCalculator, FaMountain, FaPalette, FaUserTie } from "react-icons/fa"
import bg1 from "../../assets/bg1.png"
import bg2 from "../../assets/bg2.png"
import bg3 from "../../assets/bg3.png"
import bg4 from "../../assets/bg2.png"
import "./style.css"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { baseThumbnailStyles } from "./SharedStyles"
import { StackProps } from "@chakra-ui/react"
const Data = [
  { bgImg: bg1, icon: <FaPalette />, text: "Upgrade your brand" },
  { bgImg: bg2, icon: <FaCalculator />, text: "Manage your finances" },
  { bgImg: bg3, icon: <FaMountain />, text: "Take a day off" },
  { bgImg: bg4, icon: <FaUserTie />, text: "Learn from pros" },
]

const FourWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest} width="full" overflowX="auto" mt="70">
      <Heading className="heading" fontSize="36px" color="#595959" fontWeight="600" py={2} px={4}>
        Small business starter packs
      </Heading>

      <Box overflowX="auto" pb={3}>
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
  const [hover, setHover] = useState(false)
  const { bgImg, icon, text } = props
  return (
    <AspectRatio
      className="cursor"
      w={{ base: "200px", md: "303px" }}
      border="12px solid transparent"
      borderRadius="30px"
      _hover={{ shadow: "lg", border: "12px solid #699dff" }}
      ratio={1}
      {...baseThumbnailStyles}
      to={`/list/edit`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <VStack position="relative">
        <CloudinaryImage
          w="full"
          h="full"
          fit="cover"
          zIndex={-1}
          borderRadius="16px"
          quality="good"
          position="absolute"
          src={bgImg}
          filter="brightness(80%)"
        />
        <VStack>
          <Box fontSize="36px" color="white" mb="1">
            {icon}
          </Box>
          <Heading color="white" size="header" textAlign="center">
            {text}
          </Heading>
        </VStack>
        <Stack
          className="editlist"
          {...StackStyles}
          color={hover ? "white" : "transparent"}
          bg={hover ? "rgba(255, 255, 255, 0.15)" : "transparent"}
        >
          <Text>EDIT LIST</Text>
        </Stack>
      </VStack>
    </AspectRatio>
  )
}

export default React.memo(FourWideList)

const StackStyles: StackProps = {
  pos: "absolute",
  w: "full",
  px: "5",
  h: "53px",
  justifyContent: "center",
  align: "flex-end",
  fontWeight: "400",
  fontSize: "14px",
  fontFamily: "Poppins",
}
