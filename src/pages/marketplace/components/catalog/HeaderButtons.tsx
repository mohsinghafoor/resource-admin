import "./style.css"
import { ButtonProps, HStack } from "@chakra-ui/react"
import { ImageSearch } from "../../../../components/ImageSearch"
import { ImageUpload } from "./ImageUploader"

export default function HeaderButtons({ ImageHandler }) {
  const handleImage = (image) => {
    ImageHandler(image[0].dataURL)
  }

  return (
    <HStack alignSelf="flex-end" pr="2">
      <ImageUpload handleImage={handleImage} />
      <ImageSearch />
    </HStack>
  )
}
