import { Box, BoxProps, SimpleGrid, VStack } from "@chakra-ui/layout"
import { ButtonProps, Heading } from "@chakra-ui/react"
import { faArrowRight, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory } from "react-router"
import Button from "../../../../components/Button"
import {
  FaBullhorn,
  FaCar,
  FaUser,
  FaHardHat,
  FaHome,
  FaGraduationCap,
  FaDog,
  FaUserTie,
  FaFutbol,
  FaCalendar,
  FaSpa,
  FaPlane,
  FaUtensils,
  FaCashRegister,
} from "react-icons/fa"
import { baseThumbnailStyles } from "./foundations"
const Data = [
  { icon: <FaBullhorn />, text: "advertising & Marketing" },
  { icon: <FaCar />, text: "Automtive" },
  { icon: <FaUser />, text: "Personal Services" },
  { icon: <FaHardHat />, text: "Construction" },
  { icon: <FaHome />, text: "Building & Home Services" },
  { icon: <FaGraduationCap />, text: "Building & Home Services" },
  { icon: <FaDog />, text: "Pet Care" },
  { icon: <FaUserTie />, text: "Professional Services" },
  { icon: <FaFutbol />, text: "Sports & Entertainment" },
  { icon: <FaCalendar />, text: "Events" },
  { icon: <FaSpa />, text: "Health, Wellness, Beauty" },
  { icon: <FaPlane />, text: "Travel & Accomodations" },
  { icon: <FaSpa />, text: "Medical" },
  { icon: <FaUtensils />, text: "Restaurent" },
  { icon: <FaCashRegister />, text: "Retail" },
]

const CategoryList = ({ ...rest }: BoxProps) => {
  const history = useHistory()
  return (
    <>
      <VStack overflowX="visible" align="flex-start" {...rest} py={4}>
        <Heading fontSize="36px" color="gray.900" py={2} px={4}>
          Browse by category
        </Heading>
        <Box maxW="100vw" overflowX="auto" pb={3}>
          <SimpleGrid columns={4} rows={4} spacing={3} w="fit-content">
            {Data.map((card, index) => (
              <CategoryButton key={index} text={card.text} icon={card.icon} />
            ))}
            <Button
              variant="category"
              border=" 1px solid #BDBDBD"
              w="310px"
              leftIcon={<FontAwesomeIcon style={{ marginRight: "8px" }} icon={faGlobeAmericas} />}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              fontWeight="500"
            >
              View all listings
            </Button>
          </SimpleGrid>
        </Box>
      </VStack>
    </>
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
      leftIcon={<Box>{icon}</Box>}
      border=" 1px solid #BDBDBD"
      w="310px"
      fontWeight="500"
    >
      {text}
    </Button>
  )
}

export default CategoryList
