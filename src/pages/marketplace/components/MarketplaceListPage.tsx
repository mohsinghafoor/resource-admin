import { Box, SimpleGrid } from "@chakra-ui/layout"
import { Container, useBreakpointValue } from "@chakra-ui/react"
import { useParams } from "react-router"
import { PurpleBackdrop } from "../../../components/PurpleBackdrop"
import SplashPage from "../../../components/SplashPage"
import { MarketplaceList, useFindMarketplaceListByIdQuery } from "../../../generated/graphql"
import MarketplaceListCover from "../components/catalog/MarketplaceListCover"
import crypto1 from "../assets/crypto1.png"
import crypto2 from "../assets/crypto2.png"
import crypto3 from "../assets/crypto3.png"
import crypto4 from "../assets/crypto4.png"
import img1 from "../assets/cryptoimg1.png"
import img2 from "../assets/cryptoimg2.png"
import img3 from "../assets/cryptoimg3.png"
import img4 from "../assets/cryptoimg4.png"
import { AddListing } from "./catalog/AddListing"
import { Thumbnail } from "./catalog/CryptoList"

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
            <AddListing />
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

export default MarketplaceListPage
