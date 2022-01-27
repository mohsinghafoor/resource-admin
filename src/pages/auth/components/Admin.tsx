import { Flex } from "@chakra-ui/react"
import Sidebar from "../../../components/Sidebar"
import Catalog from "../../marketplace/components"

function Admin() {
  return (
    <Flex>
      <Sidebar />
      <Catalog />
    </Flex>
  )
}

export default Admin
