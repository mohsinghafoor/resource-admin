import { Box, BoxProps, Flex, VStack, HStack, Spacer, Stack, Center } from "@chakra-ui/layout"
import { Button, Heading, Image, Text } from "@chakra-ui/react"
import crypto1 from "../../assets/crypto1.png"
import crypto2 from "../../assets/crypto2.png"
import crypto3 from "../../assets/crypto3.png"
import crypto4 from "../../assets/crypto4.png"
import img1 from "../../assets/cryptoimg1.png"
import img2 from "../../assets/cryptoimg2.png"
import img3 from "../../assets/cryptoimg3.png"
import img4 from "../../assets/cryptoimg4.png"
import amm from "../../assets/ammount.png"

import "./style.css"

import { Thumbnail } from "./CardUi"
const Data = [
  {
    logo: crypto1,
    title: "My Bear Hand",
    img: img1,
    text: "Software Devolpment",
    ammount: "35.00",
  },
  {
    logo: crypto2,
    title: "My Bear Hand",
    img: img2,
    text: "Accounting Software Annual Subscription",
    ammount: "2,000.00",
  },
  {
    logo: crypto3,
    title: "My Bear Hand",
    img: img3,
    text: "Yeild Farming & DeFi Class",
    ammount: "700.00",
  },
  {
    logo: crypto4,
    title: "My Bear Hand",
    img: img4,
    text: "Career Counselling - Software Development",
    ammount: "50.00",
  },
  {
    logo: crypto3,
    title: "My Bear Hand",
    img: img3,
    text: "Yeild Farming & DeFi Class",
    ammount: "700.00",
  },
]

const CryptoList = ({ ...rest }: BoxProps) => {
  return (
    <VStack align="flex-start" {...rest} w="full" h="450px" pt="30">
      <Heading fontSize="28px" fontWeight="600" color="gray.900" p={4} className="heading">
        Crypto and software services
      </Heading>

      <Box overflowX="auto" maxW="full" w="full" pb={4}>
        <HStack w="full" px={7} spacing={4}>
          {Data.map((card, index) => (
            <Thumbnail
              key={index}
              title={card.title}
              text={card.text}
              logo={card.logo}
              img={card.img}
              ammount={card.ammount}
            />
          ))}
        </HStack>
      </Box>
    </VStack>
  )
}

export default CryptoList
