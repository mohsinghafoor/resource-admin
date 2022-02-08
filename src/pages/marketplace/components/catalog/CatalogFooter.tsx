import { Box, BoxProps, Heading, VStack, Stack } from "@chakra-ui/layout"
import { ButtonProps } from "@chakra-ui/react"
import { useState } from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import footerbg from "../../assets/footerbg.jpg"
import HeaderButtons from "./HeaderButtons"
import "./style.css"
import { headingStyle } from "./SharedStyles"
import EditTitle from "./EditTitle"
interface Props extends BoxProps {
  catalog: Catalog
}

const CatalogFooter = ({ catalog, ...rest }: any) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isTitle, setIsTitle] = useState(true)
  const [inputValue, setInputValue] = useState("A mutual credit marketplace")
  const [url, setUrl] = useState(footerbg)
  const handleEdit = () => {
    setIsEdit(true)
    setIsTitle(false)
  }
  const handleImage = (Images) => {
    setUrl(Images)
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack
        position="relative"
        p={4}
        h={height}
        rounded="2xl"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <CloudinaryImage
          h={height}
          w="full"
          pos="absolute"
          objectFit="cover"
          rounded="2xl"
          zIndex={-2}
          quality="good"
          src={url}
          filter={isEdit ? "brightness(20%)" : "brightness(50%)"}
        />

        <Stack
          // minH="50px"
          maxH="70px"
          alignItems="center"
          justifyContent="flex-start"
          w="600px"
        >
          <Heading
            color={isTitle ? "black" : "transparent"}
            className="heading"
            {...headingStyle}
            onClick={handleEdit}
          >
            {inputValue}
          </Heading>
          {/* {isEdit ? "block" : "none"} */}
        </Stack>
        <Box>
          <SearchBar />
        </Box>
        {/* </VStack> */}
        <Stack justifyContent="flex-end" alignItems="flex-end" w="full" pos="absolute" mt="330px">
          <HeaderButtons ImageHandler={handleImage} />
        </Stack>
      </Stack>
      <Box display={isEdit ? "block" : "none"} w="600px" pos="absolute" pb="10px">
        <EditTitle
          setIsTitle={setIsTitle}
          isTitle={isTitle}
          setIsEdit={setIsEdit}
          setInputValue={setInputValue}
        />
      </Box>
    </Stack>
  )
}

const height = {
  base: "190px",
  md: "400px",
}

const searchButtonStyles: ButtonProps = {
  bgColor: "white",
  variant: "outline",
  colorScheme: "purple",
  _hover: { shadow: "md" },
  _active: { bg: "gray.300" },
}

export default CatalogFooter
