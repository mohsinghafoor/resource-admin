import { Box } from "@chakra-ui/react"
import FeaturedList from "./catalog/FeaturedList"
import FourWideList from "./catalog/FourWideList"
import ThreeWideList from "./catalog/ThreeWideList"
import { FaCalculator, FaMountain, FaPalette, FaUserTie } from "react-icons/fa"
import bg3 from "../assets/bg3.png"
import bg1 from "../assets/bg1.png"
import bg2 from "../assets/bg2.png"
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
