import "./style.css"
import { useState } from "react"
import ReactFileReader from "react-file-reader"
import { Button, ButtonProps, HStack } from "@chakra-ui/react"
import { FaSearch, FaUpload } from "react-icons/fa"
import { ImageSearch } from "../../../../components/ImageSearch"

export default function HeaderButtons() {
  const [url, setUrl] = useState("https://i.imgur.com/ndu6pfe.png")

  const handleFiles = (files) => {
    setUrl(files.base64)
  }

  return (
    <HStack alignSelf="flex-end" pr="2">
      <ReactFileReader fileTypes={[".png", ".jpg"]} base64={true} handleFiles={handleFiles}>
        <Button leftIcon={<FaUpload />} {...buttonStyles}>
          Uploade Image
        </Button>
      </ReactFileReader>
      <ImageSearch />
    </HStack>
  )
}
const buttonStyles: ButtonProps = {
  bg: "#699DFF",
  fontSize: "14px",
  fontWeight: "700",
  h: "37px",
}
