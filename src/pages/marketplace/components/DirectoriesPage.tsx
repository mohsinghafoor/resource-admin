import { Heading } from "@chakra-ui/layout"
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { Link, Redirect, useLocation } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { getPageTitle } from "../../../components/PageTitle"
import { businessQuerySelector } from "../../../store/business"
import { listingQuerySelector } from "../../../store/listing"
import { BusinessDirectory } from "../components/BusinessDirectory"
import { ListingDirectory } from "../components/ListingDirectory"

const paths = ["/marketplace/listings", "/marketplace/businesses"]

const DirectoriesPage = () => {
  const setListingSearch = useSetRecoilState(listingQuerySelector)
  const setBusinessSearch = useSetRecoilState(businessQuerySelector)

  const containerRef = useRef<HTMLDivElement>(null)
  const currentPath = useLocation().pathname
  const tabNumber = paths.indexOf(currentPath)

  useEffect(() => {
    containerRef.current?.scrollIntoView() // scroll to top on component mount
    document.title = getPageTitle("Marketplace")
    if (currentPath.includes("listing")) {
      setBusinessSearch((prev) => ({ ...prev, searchText: "" }))
    }
    if (currentPath.includes("business")) {
      setListingSearch((prev) => ({ ...prev, fulfillmentType: "Any", types: [], searchText: "" }))
    }
    return () => {
      setBusinessSearch((prev) => ({ ...prev, searchText: "" }))
      setListingSearch((prev) => ({ ...prev, fulfillmentType: "Any", types: [], searchText: "" }))
    }
  }, [currentPath])

  if (tabNumber === -1) return <Redirect to="/marketplace/listings" />

  return (
    <>
      <Tabs
        id="tabs-ref"
        ref={containerRef}
        index={tabNumber}
        isLazy={true}
        colorScheme="primary"
        variant="line"
      >
        <Container maxW="container.xl" px={{ base: 0, md: 4 }}>
          <TabList justifyContent={{ base: "center", md: "inherit" }} pt={{ base: 2, md: 8 }}>
            <Tab>
              <Link to="/marketplace/listings">
                <Heading size="subtitle">Listings</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link to="/marketplace/businesses">
                <Heading size="subtitle">Businesses</Heading>
              </Link>
            </Tab>
          </TabList>
        </Container>
        <TabPanels>
          <TabPanel px={0} pb={0}>
            <ListingDirectory />
          </TabPanel>
          <TabPanel px={0} pb={0}>
            <BusinessDirectory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default DirectoriesPage
