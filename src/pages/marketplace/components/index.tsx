import { Box } from "@chakra-ui/react"
import CatalogFooter from "./catalog/CatalogFooter"
import CatalogCover from "./catalog/CatalogCover"
import CatalogHeader from "./CatalogHeader"
import Categories from "./Categories"
import Lists from "./Lists"
import { useLocation } from "react-router-dom"
import MarketplaceListPage from "./MarketplaceListPage"
import DirectoriesPage from "./DirectoriesPage"

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
      <CatalogHeader />
      <CatalogCover />
      <Lists />
      <Categories />
      <CatalogFooter />
    </Box>
  )
}

export default Catalog
