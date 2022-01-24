import { Badge, Box, BoxProps } from "@chakra-ui/layout"
import { Heading, VStack } from "@chakra-ui/react"
import React from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { MarketplaceList } from "../../../../generated/graphql"
import { baseThumbnailStyles } from "./foundations"
import featured from "../../assets/featured.jpg"

const FeaturedList = ({ ...rest }: any) => {
  return (
    <Box position="relative" {...rest} p={4} h={height} {...baseThumbnailStyles}>
      <CloudinaryImage
        h={height}
        w="1280px"
        zIndex={-1}
        rounded="2xl"
        quality="good"
        src={featured}
        objectFit="cover"
        filter="brightness(60%)"
      />
      <VStack top="20px" position="absolute" align="flex-start" p={12} spacing={4}>
        <Heading color="white" size="title" textAlign="center">
          Support Black-Owned Businesses
        </Heading>
        <Badge colorScheme="orange" variant="outline" px={2} py={1} rounded="md">
          FEATURED
        </Badge>
      </VStack>
    </Box>
  )
}

const height = {
  base: "220px",
  md: "500px",
}

export default FeaturedList
