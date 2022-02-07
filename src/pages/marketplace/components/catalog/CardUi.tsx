import { Box, Flex, HStack, Spacer, Stack } from "@chakra-ui/layout"
import { Button, Image, Text } from "@chakra-ui/react"
import amm from "../../assets/ammount.png"
import "./style.css"
import { FaShare, FaRegHeart, FaTrash } from "react-icons/fa"
import { addListStyles } from "./SharedStyles"
import { useState } from "react"
import { useLocation } from "react-router-dom"
export const Thumbnail = (props) => {
  const [remove, setRemove] = useState(false)
  const [hover, setHover] = useState(false)
  const location = useLocation()
  const handleRemove = (e) => {
    e.stopPropagation()
    setRemove(true)
  }
  const { title, text, logo, img, ammount } = props
  return (
    <>
      <Flex
        className="cursorpointer"
        direction="column"
        w="full"
        opacity={remove ? "0.25" : "1"}
        border={hover ? "12px solid red" : "12px solid transparent"}
        fontWeight="500"
        p="2"
        _hover={{
          border: hover ? "12px solid red" : "12px solid #699DFF",
        }}
        {...addListStyles}
      >
        <Stack bgImage={img} h="200px" borderRadius="8px" w="full">
          <HStack w="150px" h="40px" bg="rgba(255, 255, 255, 0.9)" borderRadius="8px 0px" px="1">
            <Image src={logo} alt="" />
            <Text fontSize="14px">{title}</Text>
          </HStack>
        </Stack>

        <Text fontSize="14px" mt="4" h="50px">
          {text}
        </Text>
        <Flex align="center" px="1">
          <FaShare style={{ marginRight: 20, color: "#595959" }} />
          <FaRegHeart />
          <Spacer />
          <HStack
            borderRadius="16px"
            border="1px solid gray"
            w="100px"
            h="30px"
            fontFamily="Courier Prime"
            justifyContent="center"
          >
            <Text color="black">{ammount}</Text>
            <Box bg="gray" borderRadius="20px">
              <Image src={amm} alt="" w="10px" />
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <HStack
        className="cursorpointer"
        pos="absolute"
        w="185px"
        h="97px"
        mt="-250px"
        ml="25px"
        bg={remove ? "white" : "transparent"}
        borderRadius="16px"
        color={remove ? "#595959" : "transparent"}
      >
        <Text textAlign="center" fontSize="14px" fontWeight="700">
          Listing has been unpublished
        </Text>
      </HStack>
      <Button
        display={location.pathname === "/list/edit" ? "block" : "none"}
        className="cursor"
        pos="absolute"
        mt="-55px"
        ml="30px"
        leftIcon={<FaTrash />}
        bg="transparent"
        h="37px"
        color="transparent"
        borderRadius="16px"
        fontSize="14px"
        _hover={{ bg: "#FF3C38", color: "white" }}
        onClick={handleRemove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Remove from list
      </Button>
    </>
  )
}
