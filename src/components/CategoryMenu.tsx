import { Box, BoxProps } from "@chakra-ui/react"
import { Autocomplete } from "./Autocomplete"
import { useRecoilValue } from "recoil"
import { categoriesSelector, categoryByIdSelector } from "../store/category"

interface CategoryMenuProps extends BoxProps {
  onSelect
  categoryId: string
}

export const CategoryMenu = ({ onSelect, categoryId }: CategoryMenuProps) => {
  const categories = useRecoilValue(categoriesSelector)
  const category = useRecoilValue(categoryByIdSelector(categoryId))

  return (
    <Box width={"100%"}>
      <Autocomplete
        value={category.name}
        items={categories}
        onSelect={(selectedValue) => onSelect(selectedValue)}
      />
    </Box>
  )
}
