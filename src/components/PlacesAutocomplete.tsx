import { Box, Input, List, ListItem } from "@chakra-ui/react"
import useOnclickOutside from "react-cool-onclickoutside"
import usePlacesAutocomplete from "use-places-autocomplete"

interface Props {
  value?: string
  placeholder?: string
  onChange?
  onSelect
}

export const PlacesAutocomplete = ({ value, onChange, onSelect, placeholder }: Props) => {
  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
    onChange(e)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false)
      onSelect(description)
      clearSuggestions()
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <ListItem key={place_id} onClick={handleSelect(suggestion)} _hover={{ cursor: "pointer" }}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </ListItem>
      )
    })

  return (
    <div ref={ref}>
      <Input
        isRequired
        type="text"
        name="address"
        data-testid="address"
        placeholder={placeholder ?? "Address"}
        value={value}
        onChange={handleInput}
        borderColor={value ? "black" : "inherit"}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <Box boxShadow={"lg"} p={4}>
          <List spacing={3}>{renderSuggestions()}</List>
        </Box>
      )}
    </div>
  )
}
