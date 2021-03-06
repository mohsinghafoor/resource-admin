import { Flex, Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "../../../components/Sidebar"
import Catalog from "../../marketplace/components"

function Admin() {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={0} w="full">
      <GridItem colSpan={1} h="full">
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7} w="full" h="full">
        <Catalog />
      </GridItem>
    </Grid>
  )
}

export default Admin
