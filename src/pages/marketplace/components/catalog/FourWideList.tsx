import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Heading,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/layout"
import React from "react"
import { MdColorLens } from "react-icons/md"
import { FaCalculator } from "react-icons/fa"
import { BsPersonFill } from "react-icons/bs"
import { BsFillTriangleFill } from "react-icons/bs"
import bg1 from "../../assets/bg1.png"
import bg2 from "../../assets/bg2.png"
import bg3 from "../../assets/bg3.png"
import bg4 from "../../assets/bg4.png"
import icon1 from "../../assets/icon1.png"
import { Text } from "@chakra-ui/react"

const Data = [
  { bgImg: bg1, icon: <MdColorLens />, text: "Upgrade your brand" },
  { bgImg: bg2, icon: <FaCalculator />, text: "Manage your finances" },
  { bgImg: bg3, icon: <BsFillTriangleFill />, text: "Take a day off" },
  { bgImg: bg3, icon: <BsPersonFill />, text: "Learn from pros" },
]

const FourWideList = ({ ...rest }: any) => {
  return (
    <VStack align="flex-start" {...rest} mb="50">
      <Heading fontSize="36px" color="#595959;" fontWeight="600" fontFamily="Poppins" py={2} px={4}>
        Small business starter packs
      </Heading>
      <Box maxW="100vw" pb={3}>
        <HStack px={4} spacing={5} w="fit-content">
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
    <Flex
      w={{ base: "200px", md: "303px" }}
      h="274px"
      _hover={{ shadow: "lg", border: "5px solid #699dff" }}
      bgImg={bgImg}
      borderRadius="16px"
      ratio={1}
      justify="center"
      direction="column"
      alignItems="center"
    >
      <Box fontSize="36px" color="white">
        {icon}
      </Box>

      <Text color="white" size="18px">
        {text}
      </Text>
    </Flex>
  )
}

export default React.memo(FourWideList)
