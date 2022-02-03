import { GridItem, SimpleGrid } from "@chakra-ui/react"
import { EndOfResults } from "../../../components/EndOfResults"
import { NoSearchResults } from "../../../components/NoSearchResults"
import { Thumbnail } from "./catalog/CryptoList"
import crypto1 from "../assets/crypto1.png"
import crypto2 from "../assets/crypto2.png"
import crypto3 from "../assets/crypto3.png"
import crypto4 from "../assets/crypto4.png"
import img1 from "../assets/cryptoimg1.png"
import img2 from "../assets/cryptoimg2.png"
import img3 from "../assets/cryptoimg3.png"
import img4 from "../assets/cryptoimg4.png"

export const DirectoryGrid = ({ items, total, current, pageSize, called, loading }) => {
  const isLastPage = Math.ceil(total / pageSize) === current
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
  return (
    <>
      {called && !loading && items.length === 0 && <NoSearchResults />}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={{ base: 0, sm: 6 }}>
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
      {called && isLastPage && items.length > 0 && (
        <SimpleGrid mt="60px" columns={[1]} spacing="40px">
          <GridItem mx={{ base: "auto", md: "inherit" }} />
          <EndOfResults />
        </SimpleGrid>
      )}
    </>
  )
}
