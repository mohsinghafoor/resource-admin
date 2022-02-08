import { Box, SimpleGrid } from "@chakra-ui/layout"
import { Container, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
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
import { Thumbnail } from "./catalog/CardUi"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { StatefulList } from "baseui/dnd-list"
import {
  cardDataAtom,
  closeModalAtom,
  removeListingAtom,
  replaceCardAtom,
} from "../../../store/listing"
import { useEffect, useState } from "react"
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
]

const MarketplaceListPage = () => {
  const [cardData, setCardData]: any = useState(Data)
  const { id } = useParams<{ id: string }>()
  const { data, loading } = useFindMarketplaceListByIdQuery({ variables: { id } })
  const list = data?.findMarketplaceListById as MarketplaceList
  const listings = list?.listings ?? []
  const shouldShowBackdrop = useBreakpointValue({ base: false, sm: true })
  const getCardData: any = useRecoilValue(cardDataAtom)
  const setReplaceCard: any = useSetRecoilState(replaceCardAtom)
  const replaceCard = useRecoilValue(replaceCardAtom)
  const setCloseModal = useSetRecoilState(closeModalAtom)
  const closeModal = useRecoilValue(closeModalAtom)
  const setRemoveListing = useSetRecoilState(removeListingAtom)
  const removeListing = useRecoilValue(removeListingAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (getCardData && replaceCard === "") {
      setCardData([getCardData, ...cardData])
      setCloseModal(true)
    } else if (getCardData && replaceCard >= "0") {
      cardData[parseInt(replaceCard)] = getCardData
      setReplaceCard("")
      onClose()
    }
    // else if (removeListing.index >= "0" && removeListing.state) {
    //   setCardData(cardData.filter((card, index) => removeListing.index !== index))
    //   setRemoveListing({
    //     state: false,
    //     index: "",
    //   })
    // }
  }, [getCardData])

  const handleClickCard = (index) => {
    onOpen()
    setReplaceCard(index)
  }

  if (loading) return <SplashPage />

  return (
    <Box>
      <MarketplaceListCover list={list} />
      <PurpleBackdrop showBackdrop={shouldShowBackdrop}>
        <Container maxW="container.xl" p={0}>
          <SimpleGrid my="80px" mx="10px" columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
            <AddListing />

            {cardData?.map((card, index) => (
              <Box key={index} onClick={() => handleClickCard(index)}>
                <Thumbnail
                  key={index}
                  title={card.title}
                  text={card.text}
                  logo={card.logo}
                  img={card.img}
                  ammount={card.ammount}
                  index={index}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </PurpleBackdrop>
      {isOpen && <EditlistModal isOpen={isOpen} onClose={onClose} />}
    </Box>
  )
}

export default MarketplaceListPage
