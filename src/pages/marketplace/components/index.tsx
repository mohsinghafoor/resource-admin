import { Box } from "@chakra-ui/react"
import CatalogFooter from "./catalog/CatalogFooter"
import CatalogCover from "./catalog/CatalogCover"
import CatalogHeader from "./CatalogHeader"
import Categories from "./Categories"
import Lists from "./Lists"
import { useLocation } from "react-router-dom"
import MarketplaceListPage from "./MarketplaceListPage"
import DirectoriesPage from "./DirectoriesPage"
import { StatefulList } from "baseui/dnd-list"
import FourWideList from "./catalog/FourWideList"
import ThreeWideList from "./catalog/ThreeWideList"
import FeaturedList from "./catalog/FeaturedList"
import CategoryList from "./catalog/CategoryList"
import CryptoList from "./catalog/CryptoList"

function Catalog() {
  const location = useLocation()
  if (location.pathname === "/list/edit") {
    return (
      <Box w="full">
        <CatalogHeader />
        <MarketplaceListPage />
      </Box>
    )
  }
  if (location.pathname === "/marketplace/listings") {
    return (
      <Box w="full">
        <CatalogHeader />
        <DirectoriesPage />
      </Box>
    )
  }
  return (
    <Box w="full">
      <CatalogHeader />,
      <CatalogCover key="1" />,
      <StatefulList
        initialState={{
          items: [
            // <Lists key="3" />,
            <FourWideList key="2" />,
            <ThreeWideList key="3" />,
            <FeaturedList key="4" />,
            <CategoryList key="5" />,
            <CryptoList key="6" />,
            <CatalogFooter key="7" />,
          ],
        }}
      />
      {/* <CatalogFooter key="7" />, */}
    </Box>
  )
}

export default Catalog
