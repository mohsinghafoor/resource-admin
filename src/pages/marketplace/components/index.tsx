import { Box } from "@chakra-ui/react"
import CatalogFooter from "./catalog/CatalogFooter"
import CatalogCover from "./catalog/CatalogCover"
import CatalogHeader from "./CatalogHeader"
import Categories from "./Categories"
import Lists from "./Lists"

function Catalog() {
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
