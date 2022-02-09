import { Badge, Box, Flex } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"
import { useState } from "react"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import featured from "../../assets/featured.jpg"
import IconPicker from "./IconPicker"
const FeaturedList = ({ ...rest }: any) => {
  const [hover, setHover] = useState(false)
  return (
    <Box
      position="relative"
      {...rest}
      p={4}
      h={height}
      className="cursor"
      w="full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CloudinaryImage
        h={height}
        w="full"
        zIndex={-1}
        rounded="2xl"
        quality="good"
        src={featured}
        objectFit="cover"
        filter="brightness(60%)"
      />
      <Box top="20px" position="absolute" align="flex-start" p={12} spacing={4}>
        <Heading color="white" h="70px" fontSize={{ md: "36px", base: "20px" }} textAlign="start">
          Support Black-Owned Businesses
        </Heading>
        <Badge colorScheme="orange" variant="outline" px={2} py={1} rounded="md">
          FEATURED
        </Badge>
        <IconPicker />
      </Box>
      <Flex
        bg={hover ? "rgba(255, 255, 255, 0.15)" : "none"}
        mt="-70px"
        position="absolute"
        w="97.5%"
        h="50px"
        px="5"
        alignItems="center"
        justifyContent="flex-end"
        color={hover ? "white" : "transparent"}
      >
        Edit list
      </Flex>
    </Box>
  )
}

const height = {
  base: "220px",
  md: "500px",
}

export default FeaturedList
