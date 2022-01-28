import { useState } from "react"

import { gridSize as getGridSize } from "@atlaskit/theme/constants"

import { InlineEditableTextfield } from "@atlaskit/inline-edit"

const gridSize = getGridSize()

const InlineEditTitle = () => {
  const [editValue, setEditValue] = useState("")

  return (
    <div
      style={{
        padding: `${gridSize}px ${gridSize}px ${gridSize * 6}px`,

        fontSize: 20,
      }}
    >
      <InlineEditableTextfield
        testId="editable-text-field"
        defaultValue={editValue}
        onConfirm={(value) => setEditValue(value)}
        placeholder=""
        startWithEditViewOpen
      />
    </div>
  )
}
export default InlineEditTitle
