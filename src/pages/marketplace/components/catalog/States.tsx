import { HStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
const Data = [
  { text: "Public" },
  { text: "Asheville" },
  { text: "Austin" },
  { text: "Bay area" },
  { text: "Los Angeles" },
  { text: "Sacramento" },
  { text: "San Diego" },
]

const States = ({ ...rest }: any) => {
  return (
    <HStack align="center" h="69px" spacing={4} pl="5">
      {Data.map((card, index) => (
        <CustomizeButton key={index} text={card.text} />
      ))}
    </HStack>
  )
}

const CustomizeButton = (props) => {
  const { text } = props
  return (
    <Button
      bg="#F2F2F2"
      color="#595959"
      fontSize="14px"
      fontWeight="400"
      borderRadius="18.5px"
      _hover={{ bg: "#7161EF", color: "white" }}
    >
      {text}
    </Button>
  )
}

export default States
