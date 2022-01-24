import { Box, BoxProps, SimpleGrid, VStack } from "@chakra-ui/layout"
import { ButtonProps, Heading, SkeletonText } from "@chakra-ui/react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faArrowRight, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useHistory } from "react-router"
import Button from "../../../../components/Button"
import { FaBullhorn, FaCar } from "react-icons/fa"
const Data = [
  { icon: <FaBullhorn />, text: "advertising & Marketing" },
  { icon: <FaCar />, text: "Automtive" },
  { icon: <FaCar />, text: "Personal Services" },
  { icon: <FaCar />, text: "Construction" },
  { icon: <FaCar />, text: "Building & Home Services" },
  { icon: <FaCar />, text: "Building & Home Services" },
  { icon: <FaCar />, text: "Pet Care" },
  { icon: <FaCar />, text: "Professional Services" },
  { icon: <FaCar />, text: "Sports & Entertainment" },
  { icon: <FaCar />, text: "Events" },
  { icon: <FaCar />, text: "Health, Wellness, Beauty" },
  { icon: <FaCar />, text: "Travel & Accomodations" },
  { icon: <FaCar />, text: "Medical" },
  { icon: <FaCar />, text: "Medical" },
  { icon: <FaCar />, text: "Retail" },
]

const CategoryList = ({ ...rest }: BoxProps) => {
  const history = useHistory()

  return (
    <VStack align="flex-start" {...rest}>
      <Heading size="subtitle" color="gray.900" p={4}>
        Browse by category
      </Heading>

      <Box overflowX="auto" maxW="100vw" w="full" pb={4}>
        <SimpleGrid minW="1248px" columns={4} rows={4} px={4} spacing={4}>
          {Data.map((card, index) => (
            <CategoryButton key={index} text={card.text} icon={card.icon} />
          ))}
          <Button
            variant="category"
            leftIcon={<FontAwesomeIcon style={{ marginRight: "8px" }} icon={faGlobeAmericas} />}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={() => history.push("/marketplace/listings")}
          >
            View all listings
          </Button>
        </SimpleGrid>
      </Box>
    </VStack>
  )
}

interface CategoryButtonProps extends ButtonProps {
  navigate: (categoryText: string) => void
}

const CategoryButton = (props) => {
  const { icon, text } = props
  return (
    <Button
      variant="category"
      leftIcon={<FontAwesomeIcon style={{ marginRight: "8px", color: "black" }} icon={icon} />}
    >
      {text}
    </Button>
  )
}

export default CategoryList
