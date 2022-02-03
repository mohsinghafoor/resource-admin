import { ButtonProps, InputProps } from "@chakra-ui/react"
import { HStack, VStack, IconButton, Input } from "@chakra-ui/react"
import { FaCheck, FaTimes } from "react-icons/fa"
import "./style.css"
const EditTitle = ({ setIsTitle, setIsEdit, setInputValue }: any) => {
  const handleClickCross = () => {
    setIsTitle(true)
    setIsEdit(false)
  }
  const handleClickTick = () => {
    setIsTitle(true)
    setIsEdit(false)
  }

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <VStack p="4" mt="30px" w="690px" alignSelf="center">
      <Input {...inputStyles} onChange={handleChangeInput} />
      <HStack alignSelf="flex-end">
        <IconButton
          aria-label="Checked"
          bg="#3772FF"
          icon={<FaCheck />}
          onClick={handleClickTick}
        />
        <IconButton
          aria-label="Checked"
          bg="#FF3C38"
          icon={<FaTimes />}
          onClick={handleClickCross}
        />
      </HStack>
    </VStack>
  )
}
const buttonStyles: ButtonProps = {
  bg: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  color: "#957FEF",
  background: "#ffffff",
}
const inputStyles: InputProps = {
  borderRadius: "8px",
  w: "658px",
  background: "#ffffff",
  h: "62px",
  fontSize: "28px",
  fontWeight: "600",

  border: " 6px solid transparent",
  _focus: { border: " 6px solid #699DFF" },
}
export default EditTitle
