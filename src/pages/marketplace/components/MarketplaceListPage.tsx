import { Box, SimpleGrid, Flex, Spacer, HStack, Text, Stack, BoxProps } from "@chakra-ui/layout"
import { Container, Image, useBreakpointValue } from "@chakra-ui/react"
import { useParams } from "react-router"
import CloudinaryImage from "../../../components/CloudinaryImage"
import { PurpleBackdrop } from "../../../components/PurpleBackdrop"
import SplashPage from "../../../components/SplashPage"
import { MarketplaceList, useFindMarketplaceListByIdQuery } from "../../../generated/graphql"
import colors from "../../../theme/foundations/colors"
import MarketplaceListCover from "../components/catalog/MarketplaceListCover"
import { baseThumbnailStyles } from "./catalog/foundations"
import { ListingCard } from "./ListingCard"
import crypto1 from "../assets/crypto1.png"
import crypto2 from "../assets/crypto2.png"
import crypto3 from "../assets/crypto3.png"
import crypto4 from "../assets/crypto4.png"
import img1 from "../assets/cryptoimg1.png"
import img2 from "../assets/cryptoimg2.png"
import img3 from "../assets/cryptoimg3.png"
import img4 from "../assets/cryptoimg4.png"
import amm from "../assets/ammount.png"
import { FaRegHeart, FaShare } from "react-icons/fa"
import { ListingList } from "../../storefront/StorefrontPage"
import EditlistModal from "./catalog/EditlistModal"

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
    logo: crypto2,
    title: "My Bear Hand",
    img: img2,
    text: "Accounting Software Annual Subscription",
    ammount: "2,000.00",
  },
  {
    logo: crypto2,
    title: "My Bear Hand",
    img: img2,
    text: "Accounting Software Annual Subscription",
    ammount: "2,000.00",
  },
  {
    logo: crypto2,
    title: "My Bear Hand",
    img: img2,
    text: "Accounting Software Annual Subscription",
    ammount: "2,000.00",
  },
  {
    logo: crypto2,
    title: "My Bear Hand",
    img: img2,
    text: "Accounting Software Annual Subscription",
    ammount: "2,000.00",
  },
]
const MarketplaceListPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = useFindMarketplaceListByIdQuery({ variables: { id } })
  const list = data?.findMarketplaceListById as MarketplaceList
  const listings = list?.listings ?? []
  const shouldShowBackdrop = useBreakpointValue({ base: false, sm: true })

  if (loading) return <SplashPage />

  return (
    <Box>
      <MarketplaceListCover list={list} />
      <PurpleBackdrop showBackdrop={shouldShowBackdrop}>
        <Container maxW="container.xl" p={0}>
          <SimpleGrid my="80px" mx="10px" columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
            <ListingList />
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
          </SimpleGrid>
        </Container>
      </PurpleBackdrop>
    </Box>
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
          <Box position="absolute">
            <EditlistModal />
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
export default MarketplaceListPage
