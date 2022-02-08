import { Box } from "@chakra-ui/react"
import FeaturedList from "./catalog/FeaturedList"
import FourWideList from "./catalog/FourWideList"
import ThreeWideList from "./catalog/ThreeWideList"
import { StatefulList } from "baseui/dnd-list"
function Lists() {
  return (
    <Box mt="70">
      <StatefulList
        initialState={{
          items: [<FourWideList key="2" />, <ThreeWideList key="3" />, <FeaturedList key="4" />],
        }}
      />
      {/* <FourWideList />
      <ThreeWideList />
      <FeaturedList /> */}
    </Box>
  )
}

export default Lists
