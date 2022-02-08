import { Box, BoxProps, Heading, Stack } from "@chakra-ui/layout"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import coverImage from "../../assets/coverbg.jpg"
import { useState } from "react"
import { headingStyle } from "./SharedStyles"
import EditTitle from "./EditTitle"
import HeaderButtons from "./HeaderButtons"
interface Props extends BoxProps {
  catalog: Catalog
}

const CatalogCover = ({ catalog, ...rest }: any) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isTitle, setIsTitle] = useState(true)
  const [inputValue, setInputValue] = useState("Buy and sell with credit")
  const [url, setUrl] = useState(coverImage)
  const handleEdit = () => {
    setIsEdit(true)
    setIsTitle(false)
  }

  const handleImage = (Images) => {
    setUrl(Images)
  }
  return (
    <Stack alignItems="center" justifyContent="center" mt="20px">
      <Stack
        className="cursor"
        position="relative"
        p={4}
        h={height}
        rounded="2xl"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <CloudinaryImage
          h={height}
          w="full"
          pos="absolute"
          objectFit="cover"
          rounded="2xl"
          zIndex={-2}
          quality="good"
          src={url}
          filter={isEdit ? "brightness(20%)" : "brightness(50%)"}
        />

        <Stack
          // minH="50px"
          maxH="70px"
          alignItems="center"
          justifyContent="flex-start"
          w="600px"
        >
          <Heading
            color={isTitle ? "black" : "transparent"}
            className="heading"
            {...headingStyle}
            onClick={handleEdit}
          >
            {inputValue}
          </Heading>
        </Stack>
        <Box>
          <SearchBar />
        </Box>

        <Stack justifyContent="flex-end" alignItems="flex-end" w="full" pos="absolute" mt="430px">
          <HeaderButtons ImageHandler={handleImage} />
        </Stack>
      </Stack>
      <Box display={isEdit ? "block" : "none"} w="600px" pos="absolute" pb="10px">
        <EditTitle
          setIsTitle={setIsTitle}
          isTitle={isTitle}
          setIsEdit={setIsEdit}
          setInputValue={setInputValue}
        />
      </Box>
    </Stack>
  )
}

const height = {
  base: "220px",
  md: "600px",
}

const coverStyles: any = {
  height,
  width: "full",
  objectFit: "cover",
}

export default CatalogCover
