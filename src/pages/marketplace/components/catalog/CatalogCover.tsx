import { Box, BoxProps, Heading, VStack, Stack } from "@chakra-ui/layout"
import React from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import coverImage from "../../assets/coverbg.jpg"
import { useState } from "react"
import { headingStyle } from "./foundations"
import EditTitle from "./EditTitle"
import HeaderButtons from "./HeaderButtons"
interface Props extends BoxProps {
  catalog: Catalog
}

const CatalogCover = ({ catalog, ...rest }: any) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isTitle, setIsTitle] = useState(true)
  const [inputValue, setInputValue] = useState("Buy and sell with credit")
  const [url, setUrl] = useState(coverImage)
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
      <VStack
        p={4}
        w="full"
        position="absolute"
        zIndex={1}
        spacing={6}
        justify="center"
        height={height}
      >
        <Stack h="150px" mt="130px">
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
        <Stack h="200px" justifyContent="flex-end" w="full">
          <HeaderButtons ImageHandler={handleImage} />
        </Stack>
      </VStack>
    </Box>
  )
}

const height = {
  base: "220px",
  md: "600px",
}

const coverStyles: any = {
  height,
  width: "full",
  objectFit: "cover",
  position: "absolute",
}

export default CatalogCover
