import { Box, BoxProps, Flex, Heading, HStack, Image, Spacer, Stack, Text } from "@chakra-ui/react"
import { FaRegHeart, FaShare } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Business } from "../../../generated/graphql"
import amm from "../assets/ammount.png"
import crypto1 from "../assets/crypto1.png"
import crypto2 from "../assets/crypto2.png"
import crypto3 from "../assets/crypto3.png"
import crypto4 from "../assets/crypto4.png"
import img1 from "../assets/cryptoimg1.png"
import img2 from "../assets/cryptoimg2.png"
import img3 from "../assets/cryptoimg3.png"
import img4 from "../assets/cryptoimg4.png"
interface BusinessCardProps {
  business: Business
}

export const cardStyles: BoxProps = {
  bgColor: "white",
  overflow: "hidden",
  flexDir: "column",
  borderRadius: "lg",
  shadow: "md",
  _hover: {
    shadow: "lg",
  },
}

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
]

export const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Link to={`/${business.handle}`}>
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
    </Link>
  )
}

const Thumbnail = (props) => {
  const { title, text, logo, img, ammount } = props
  return (
    <Flex
      className="cursor"
      direction="column"
      border="12px solid transparent"
      fontWeight="500"
      p="2"
      _hover={{
        border: "12px solid #699DFF",
      }}
      {...addListStyles}
    >
      <Stack bgImage={img} h="200px" borderRadius="8px">
        <HStack w="150px" h="40px" bg="rgba(255, 255, 255, 0.9)" borderRadius="8px 0px" px="1">
          <Image src={logo} alt="" />
          <Text fontSize="14px">{title}</Text>
        </HStack>
      </Stack>

      <Text fontSize="14px" mt="4" h="50px">
        {text}
      </Text>
      <Flex align="center" px="1">
        <FaShare style={{ marginRight: 20, color: "#595959" }} />
        <FaRegHeart />
        <Spacer />
        <HStack
          borderRadius="16px"
          border="1px solid gray"
          w="100px"
          h="30px"
          fontFamily="Courier Prime"
          justifyContent="center"
        >
          <Text color="black">{ammount}</Text>
          <Box bg="gray" borderRadius="20px">
            <Image src={amm} alt="" w="10px" />
          </Box>
        </HStack>
      </Flex>
    </Flex>
  )
}

const addListStyles: BoxProps = {
  fontWeight: "500",
  borderRadius: "16px",
  width: "236px",
  height: "321px",
}
