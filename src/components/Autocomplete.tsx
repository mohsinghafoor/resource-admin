import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  List,
  ListItem,
  ListItemProps,
  ListProps,
  Text,
  HStack,
} from "@chakra-ui/react"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCombobox } from "downshift"
import { forwardRef, useEffect, useState } from "react"

interface ComboboxInputProps extends InputProps {
  isOpen
  selectedItem
  clearSelection
  openMenu
  closeMenu
}

const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(({ ...props }, ref) => {
  const handleIconClick = () => {
    props.isOpen ? props.closeMenu() : props.openMenu()
  }

  return (
    <InputGroup>
      <Input {...props} ref={ref} isDisabled={props.isDisabled} />
      <InputRightElement>
        <Box onClick={handleIconClick} p={2}>
          <FontAwesomeIcon icon={props.isOpen ? faChevronUp : faChevronDown} />
        </Box>
      </InputRightElement>
    </InputGroup>
  )
})
ComboboxInput.displayName = "ComboboxInput"

interface ComboboxListProps extends ListProps {
  isOpen: boolean
}

const ComboboxList = forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ isOpen, ...props }, ref) => {
    return (
      <Box maxH="300px" display={isOpen ? undefined : "none"}>
        <List
          mt={2}
          w="100%"
          zIndex={999}
          boxShadow="lg"
          borderRadius={"2xl"}
          maxH="300px"
          overflowY="auto"
          bgColor="white"
          py={2}
          {...props}
          ref={ref}
        />
      </Box>
    )
  },
)

ComboboxList.displayName = "ComboboxList"

interface ComboboxItemProps extends ListItemProps {
  itemIndex: number
  highlightedIndex: number
}

const ComboboxItem = forwardRef<HTMLLIElement, ComboboxItemProps>(
  ({ itemIndex, highlightedIndex, ...props }, ref) => {
    const isActive = itemIndex === highlightedIndex
    return (
      <ListItem
        transition="background-color 220ms, color 220ms"
        background={isActive ? "gray.100" : ""}
        px={4}
        py={2}
        rounded="2xl"
        cursor="pointer"
        {...props}
        ref={ref}
      />
    )
  },
)

ComboboxItem.displayName = "ComboboxItem"

interface ItemsProps {
  value: string
  label: string
  icon?: string
  parent?: string
}

interface AutocompleteProps {
  items: ItemsProps[] | any[]
  isDisabled?: boolean
  onSelect
  value?: string
}

export const Autocomplete = ({ items, isDisabled, onSelect, value }: AutocompleteProps) => {
  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
    reset,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    initialInputValue: value,
    itemToString: (item) => (item && item.label ? item.label : ""),
    onIsOpenChange: () => setInputItems(items),
    onInputValueChange: ({ inputValue = "" }) => {
      setInputItems(
        items &&
          items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())),
      )
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem?.value)
    },
  })

  useEffect(() => {
    setInputItems(items)
    setInputValue(value ?? "")
  }, [items])

  return (
    <Flex direction="column">
      <Flex {...getComboboxProps()} position="relative" direction="column" flex="1 1 auto">
        <Flex direction="row" alignItems="baseline">
          <ComboboxInput
            {...getInputProps({ onMouseDown: openMenu })}
            selectedItem={selectedItem}
            isDisabled={isDisabled}
            clearSelection={reset}
            isOpen={isOpen}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
        </Flex>

        <ComboboxList isOpen={isOpen} {...getMenuProps()} flex={1} position="absolute">
          {inputItems.map((item, index) => (
            <ComboboxItem
              {...getItemProps({ item, index })}
              itemIndex={index}
              highlightedIndex={highlightedIndex}
              key={index}
            >
              <HStack alignItems={"baseline"}>
                {item.icon && (
                  <Box mr={2}>
                    <FontAwesomeIcon icon={item.icon} size={"sm"} />
                  </Box>
                )}
                <Text>{item.label}</Text>
                {item.parent && (
                  <Text variant="caption" ml={2} color={"gray.500"}>
                    in {item.parent.name}
                  </Text>
                )}
              </HStack>
            </ComboboxItem>
          ))}
          {!inputItems.length && (
            <ComboboxItem itemIndex={0} cursor="not-allowed" highlightedIndex={highlightedIndex}>
              No result found
            </ComboboxItem>
          )}
        </ComboboxList>
      </Flex>
    </Flex>
  )
}
