import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"
import { FaUpload } from "react-icons/fa"
import ImageUploading, { ImageListType } from "react-images-uploading"

export function ImageUpload({ handleImage }) {
  const [images, setImages] = React.useState([])

  const maxNumber = 69

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex)
    setImages(imageList as never[])
    handleImage(imageList)
  }

  return (
    <div className="App">
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ onImageUpload }) => (
          <Button leftIcon={<FaUpload />} {...buttonStyles} onClick={onImageUpload}>
            Uploade Image
          </Button>
        )}
      </ImageUploading>
    </div>
  )
}
const buttonStyles: ButtonProps = {
  bg: "#699DFF",
  fontSize: "14px",
  fontWeight: "700",
  h: "37px",
}
