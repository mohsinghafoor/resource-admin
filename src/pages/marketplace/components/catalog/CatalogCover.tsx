import { BoxProps, Heading, Stack } from "@chakra-ui/layout"
import { Catalog } from "../../../../generated/graphql"
import SearchBar from "./SearchBar"
import coverImage from "../../assets/coverbg.jpg"
import HeaderButtons from "./HeaderButtons"
import { headingStyle } from "./foundations"
import EditTitle from "./EditTitle"
import { useState } from "react"
interface Props extends BoxProps {
  catalog: Catalog
}

const CatalogCover = ({ ...rest }: any) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isTitle, setIsTitle] = useState(true)
  const [inputValue, setInputValue] = useState("Buy and sell with credit")
  const [url, setUrl] = useState(coverImage)

  const height = {
    base: "220px",
    md: "600px",
  }

  const coverStyles: BoxProps = {
    height,
    bgImg: url,
    backgroundSize: "100%",
    width: "1320px",
    objectFit: "cover",
    filter: "brightness(90%)",
    justifyContent: "center",
  }

  const handleEdit = () => {
    setIsEdit(true)
    setIsTitle(false)
  }

  const handleImage = (Images) => {
    setUrl(Images)
  }
  return (
    <Stack {...coverStyles}>
      <Stack h="150px" mt="130px">
        {isTitle && (
          <Heading className="heading" {...headingStyle} mt="60px" onClick={handleEdit}>
            {inputValue}
          </Heading>
        )}

        {isEdit && (
          <EditTitle
            setIsTitle={setIsTitle}
            isTitle={isTitle}
            setIsEdit={setIsEdit}
            setInputValue={setInputValue}
          />
        )}
      </Stack>
      <SearchBar />

      <Stack h="200px" justifyContent="flex-end">
        <HeaderButtons ImageHandler={handleImage} />
      </Stack>
    </Stack>
  )
}

export default CatalogCover
