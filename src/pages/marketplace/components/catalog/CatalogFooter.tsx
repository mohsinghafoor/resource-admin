import { Box, BoxProps, Heading, VStack, Stack } from "@chakra-ui/layout"
import { ButtonProps } from "@chakra-ui/react"
import { useState } from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import footerbg from "../../assets/footerbg.jpg"
import HeaderButtons from "./HeaderButtons"
import "./style.css"
import { headingStyle } from "./foundations"
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
    <Box position="relative" p={4} rounded="2xl">
      <CloudinaryImage
        h={imageHeight}
        w="full"
        objectFit="cover"
        rounded="2xl"
        zIndex={-2}
        quality="good"
        src={url}
        filter="brightness(50%)"
      />
      <VStack
        position="absolute"
        bottom="0px"
        left="0px"
        right="0px"
        top="0px"
        spacing={6}
        justify="center"
        p={8}
      >
        <Stack h="150px">
          {isTitle && (
            <Heading className="heading" {...headingStyle} mt="60px" onClick={handleEdit}>
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
        </Stack>

        <SearchBar />
        <Stack justifyContent="flex-end" alignItems="flex-end" w="full" h="100px">
          <HeaderButtons ImageHandler={handleImage} />
        </Stack>
      </VStack>
    </Box>
  )
}

const imageHeight = {
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
