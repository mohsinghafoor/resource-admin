import { chakra, IconProps, Text, TextProps } from "@chakra-ui/react"
import React from "react"
import colors from "../../theme/foundations/colors"
import { RusdGlyphGradient, RusdGlyphSolid } from "./Glyph"

export interface GlyphLabelProps extends TextProps {
  value?: number | null | string
  loading?: boolean
  _label?: TextProps
  _glyph?: IconProps
}

const GlyphLabel = (props: GlyphLabelProps) => {
  const { id, value, loading, _label, _glyph, ...rest } = props

  return (
    <chakra.span {...rest} whiteSpace="nowrap">
      <Label id={id} loading={loading} value={value} {..._label} />
      <Glyph mb="1px" ml="6px" {...({ ...rest, ..._glyph } as any)} />
    </chakra.span>
  )
}

const Glyph = (props: GlyphLabelProps) => {
  return props.color !== colors.purple.main ? (
    <RusdGlyphSolid boxSize="12px" display="initial" {...(props as any)} />
  ) : (
    <RusdGlyphGradient purple boxSize="12px" display="initial" {...(props as any)} />
  )
}

const Label = (props: GlyphLabelProps) => {
  const { value, id, loading } = props
  const numberValue = typeof value === "string" ? parseFloat(value) : value ?? 0
  if (isNaN(numberValue)) throw new Error("could not parse Glyph value")
  const formattedValue = walletValueToString(numberValue)

  return (
    <>
      <Text
        display={loading ? "none" : "initial"}
        id={id}
        as="span"
        {...props}
        variant="number"
        lineHeight={1}
      >
        {loading ? "----" : formattedValue}
      </Text>
      <Text display={loading ? "initial" : "none"} as="span" variant="number" lineHeight={1}>
        ----
      </Text>
    </>
  )
}

type OptionsType = { decimals: number }
export const walletValueToString = (val: number, options?: OptionsType) => {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: options?.decimals ?? 2,
    maximumFractionDigits: options?.decimals ?? 2,
  })
}

export default GlyphLabel
