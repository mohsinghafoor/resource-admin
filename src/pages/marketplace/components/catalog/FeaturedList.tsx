import { Badge, Box, BoxProps } from "@chakra-ui/layout"
import { Heading, VStack } from "@chakra-ui/react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import featured from "../../assets/featured.jpg"
import { Link } from "react-router-dom"

const FeaturedList = ({ ...rest }: any) => {
  return (
    <Box position="relative" {...rest} p={4} h={height} className="cursor" w="1310px">
      <CloudinaryImage
        h={height}
        w="1310px"
        zIndex={-1}
        rounded="2xl"
        quality="good"
        src={featured}
        objectFit="cover"
        filter="brightness(60%)"
      />
      <VStack
        top="20px"
        position="absolute"
        align="flex-start"
        p={12}
        spacing={4}
        w={{ md: "900px", base: "300px" }}
      >
        <Heading color="white" fontSize={{ md: "36px", base: "20px" }} textAlign="center">
          Support Black-Owned Businesses
        </Heading>
        <Badge colorScheme="orange" variant="outline" px={2} py={1} rounded="md">
          FEATURED
        </Badge>
        <Link to="/admin" className="link" style={{ width: 1280, marginLeft: -50, marginTop: 380 }}>
          Edit List
        </Link>
      </VStack>
    </Box>
  )
}

const height = {
  base: "220px",
  md: "500px",
}

export default FeaturedList
