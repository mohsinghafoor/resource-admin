import { Box } from "@chakra-ui/react"
import FeaturedList from "./catalog/FeaturedList"
import FourWideList from "./catalog/FourWideList"
import ThreeWideList from "./catalog/ThreeWideList"
function Lists() {
  return (
    <Box mt="70">
      <FourWideList />
      <ThreeWideList />
      <FeaturedList />
    </Box>
  )
}

export default Lists
