import { Box, HStack, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

interface InputTagProps {
  values: string[]
  isDisabled?: boolean
  onChange?
}

export const InputTag = ({ values, onChange }: InputTagProps) => {
  const [tags, setTags] = useState<string[]>(values)
  const [tagInput, setTagInput] = useState("")
  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange(tags)
  }, [tags])

  const removeTag = (i) => {
    const newTags = [...tags]
    newTags.splice(i, 1)
    setTags(newTags)
  }

  const inputKeyDown = (e) => {
    const val = e.target.value
    if (e.key === "Enter" && val) {
      if (tags.length > 2) return
      if (tags.find((tag: string) => tag.toLowerCase() === val.toLowerCase())) {
        return
      }
      setTags(tags.concat([val.trim()]))
      setTagInput("")
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        borderRadius="2xl"
        cursor={"text"}
        px="2"
        overflowX={"auto"}
        onClick={() => inputRef.current?.focus()}
        _hover={{
          shadow: "sm",
        }}
        style={{
          border: hasFocus ? "1px solid #7161EF" : "1px solid #e2e8f0",
        }}
      >
        <HStack minH="40px">
          <HStack width={"auto"}>
            {tags.map((tag, i) => (
              <Tag
                size={"md"}
                key={i}
                borderRadius="4px"
                variant="solid"
                color="black"
                background="gray.100"
                width="100%"
                minWidth="40"
                justifyContent={"space-between"}
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    removeTag(i)
                  }}
                />
              </Tag>
            ))}
          </HStack>
          <Input
            size="md"
            variant="unstyled"
            value={tagInput}
            onKeyDown={(e) => inputKeyDown(e)}
            onChange={(e) => setTagInput(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            disabled={tags.length > 2}
            paddingInlineStart={4}
            height={10}
          />
        </HStack>
      </Box>
    </>
  )
}
