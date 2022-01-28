import React, { useState, useRef, useEffect } from "react"
import { Box, HStack, IconButton } from "@chakra-ui/react"
import {
  DefaultDraftBlockRenderMap,
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromHTML,
  ContentState,
} from "draft-js"
import { convertToHTML } from "draft-convert"
import {
  faBold,
  faUnderline,
  faItalic,
  faListOl,
  faListUl,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "draft-js/dist/Draft.css"

interface RichTextEditorProps {
  placeholder?: string
  onChange
  value?: string
}
EditorState.createWithContent

export const RichTextEditor = ({ placeholder, onChange, value }: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [hasFocus, setHasFocus] = useState(false)

  const editor = useRef<any>()

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(value ?? "")
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )
    setEditorState(EditorState.createWithContent(state))
  }, [])

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
      return ""
    }
    return getDefaultKeyBinding(e)
  }

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const focusEditor = () => {
    editor.current.focus()
    if (!value) onChange("")
  }
  const updateEditorState = (val) => {
    setEditorState(val)
    onChange(convertToHTML(editorState.getCurrentContent()))
  }

  return (
    <Box width={"100%"}>
      <HStack m={2}>
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
        <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
      </HStack>
      <Box
        borderRadius="2xl"
        cursor={"text"}
        px={5}
        py={2}
        minH={100}
        onClick={() => focusEditor()}
        _hover={{
          shadow: "sm",
        }}
        style={{
          background: hasFocus ? "#f1f1f1" : "inherit",
          border: hasFocus ? "1px solid #333" : "1px solid #e2e8f0",
        }}
      >
        <DraftEditor
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          blockRenderMap={DefaultDraftBlockRenderMap}
          editorState={editorState}
          onChange={updateEditorState}
          keyBindingFn={mapKeyToEditorCommand}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={getBlockStyle}
          placeholder={placeholder}
          ref={editor}
          spellCheck={true}
        />
      </Box>
    </Box>
  )
}

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote"
    default:
      return ""
  }
}

interface StyleButtonProps {
  onToggle
  active: boolean
  label: string
  style
  icon
}

const StyleButton = (props: StyleButtonProps) => {
  const onToggle = (e) => {
    e.preventDefault()
    props.onToggle(props.style)
  }

  return (
    <IconButton
      aria-label={props.label}
      onMouseDown={onToggle}
      size="xs"
      isActive={props.active}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      icon={<FontAwesomeIcon icon={props.icon} />}
    ></IconButton>
  )
}

const BLOCK_TYPES = [
  { label: "UL", style: "unordered-list-item", icon: faListUl },
  { label: "OL", style: "ordered-list-item", icon: faListOl },
]

const BlockStyleControls = (props) => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  return (
    <>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </>
  )
}

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: faBold },
  { label: "Italic", style: "ITALIC", icon: faItalic },
  { label: "Underline", style: "UNDERLINE", icon: faUnderline },
]

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </>
  )
}
