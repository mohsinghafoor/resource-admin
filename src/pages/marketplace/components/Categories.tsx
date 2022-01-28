import { Box } from "@chakra-ui/react"
import CategoryList from "./catalog/CategoryList"
import CryptoList from "./catalog/CryptoList"

function Categories() {
  return (
    <Box mt="50">
      <CategoryList />
      <CryptoList />
    </Box>
  )
}

export default Categories
