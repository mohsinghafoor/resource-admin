import { VStack, Text, Link } from "@chakra-ui/react"

import {
  FaUsers,
  FaCrown,
  FaStore,
  FaTag,
  FaBookOpen,
  FaExchangeAlt,
  FaShoppingCart,
  FaTools,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"
const Data = [
  { icon: <FaUsers />, text: "Users" },
  { icon: <FaUsers />, text: "Users" },
  { icon: <FaCrown />, text: "Ambassadors" },
  { icon: <FaStore />, text: "Businesses" },
  { icon: <FaTag />, text: "Listings" },
  { icon: <FaBookOpen />, text: "Catalog" },
  { icon: <FaExchangeAlt />, text: "Transactions" },
  { icon: <FaShoppingCart />, text: "Orders" },
  { icon: <FaTools />, text: "Business tools" },
  { icon: <FaCog />, text: "Settings" },
  { icon: <FaSignOutAlt />, text: "Log Out", link: "/" },
]
function Sidebar() {
  return (
    <VStack w="full" h="full" alignItems="flex-start" px="5">
      {Data.map((card, index) => (
        <Thumbnail key={index} text={card.text} icon={card.icon} link={card.link} />
      ))}
    </VStack>
  )
}

const Thumbnail = (props) => {
  const { icon, text, link } = props
  return (
    <Link
      href={link}
      fontSize="16px"
      fontWeight="900"
      bg="none"
      display="flex"
      color="black"
      alignItems="center"
      justifyContent="flex-start"
      h="40px"
      w="10rem"
      _hover={{
        bg: "linear-gradient(0deg, rgba(113, 97, 239, 0.05), rgba(113, 97, 239, 0.05)), #FFFFFF",
        color: "#7161EF",
        borderRadius: 0,
      }}
    >
      {icon}
      <Text fontSize="14px" fontWeight="400" fontFamily="Poppins" ml="1">
        {text}
      </Text>
    </Link>
  )
}

export default Sidebar
