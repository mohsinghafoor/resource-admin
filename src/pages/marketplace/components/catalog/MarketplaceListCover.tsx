import { Box, Spacer, HStack, VStack } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useHistory } from "react-router"
import Button from "../../../../components/Button"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { MarketplaceList } from "../../../../generated/graphql"
import { coverStyles } from "../../../storefront/StorefrontPage"
import { catalogButtonStyles } from "./SearchBar"
import cover from "../../assets/coverbg.png"
import EditTitle from "./EditTitle"
import HeaderButtons from "./HeaderButtons"
import { FaPalette, FaPallet, FaRegImages } from "react-icons/fa"
const MarketplaceListCover = ({ ...rest }: any) => {
  const history = useHistory()
  const [isEdit, setIsEdit] = useState(false)
  const [isTitle, setIsTitle] = useState(true)
  const [url, setUrl] = useState(cover)
  const [inputValue, setInputValue] = useState("Buy and sell with credit")
  const handleEdit = () => {
    setIsEdit(true)
    setIsTitle(false)
  }

  const handleImage = (Images) => {
    setUrl(Images)
  }
  return (
    <Box {...coverStyles} {...rest} position="relative">
      <CloudinaryImage
        {...coverStyles}
        zIndex={-2}
        quality="good"
        src={url}
        filter="brightness(50%)"
      />
      <HStack w="full" px="5" h="100px" mt="-300px" position="absolute">
        <Button
          {...catalogButtonStyles}
          onClick={() => history.push(`/admin`)}
          leftIcon={<FontAwesomeIcon icon={"arrow-left"} />}
          visibility={{ base: "hidden", md: "initial" }}
        >
          Back
        </Button>
        <Spacer />
        <VStack alignItems="flex-end">
          {isTitle && (
            <Heading
              className="heading"
              onClick={handleEdit}
              fontSize="36px"
              color="white"
              borderRadius="16px"
              _hover={{ bg: "white", color: "black", border: " 6px solid #699DFF" }}
            >
              {inputValue}
            </Heading>
          )}

          {isEdit && (
            <EditTitle
              setIsTitle={setIsTitle}
              isTitle={isTitle}
              setIsEdit={setIsEdit}
              setInputValue={setInputValue}
            />
          )}
        </VStack>
        <FaPalette style={{ color: "white", fontSize: "28" }} />
      </HStack>
      <HStack w="full" justifyContent="flex-end" position="absolute" mt="-50px">
        <HeaderButtons ImageHandler={handleImage} />
      </HStack>
    </Box>
  )
}

const margin = "30px"

export default MarketplaceListCover
