import { Box, BoxProps, Heading, VStack } from "@chakra-ui/layout"
import React from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import coverImage from "../../assets/coverbg.jpg"

interface Props extends BoxProps {
  catalog: Catalog
}

const CatalogCover = ({ ...rest }: any) => {
  return (
    <Box {...coverStyles} {...rest} position="relative" mb="500">
      <CloudinaryImage
        {...coverStyles}
        zIndex={-2}
        quality="good"
        src={coverImage}
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
        <Heading color="white" size="title" textAlign="center">
          Buy and sell with credit.
        </Heading>
        <SearchBar />
      </VStack>
    </Box>
  )
}

const height = {
  base: "220px",
  md: "450px",
}

const coverStyles: any = {
  height,
  width: "full",
  objectFit: "cover",
  position: "absolute",
}

export default CatalogCover
