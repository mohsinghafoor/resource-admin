import { chakra, Flex } from "@chakra-ui/react"
import React from "react"

interface Props {
  value: number
  children?: React.ReactNode
}

const Badge = ({ value }: Props) => {
  return (
    <chakra.span
      pos="absolute"
      top="-1px"
      right="-1px"
      px={2}
      py={1}
      fontSize="xs"
      fontWeight="bold"
      lineHeight="none"
      transform="translate(50%,-50%)"
      color="white"
      bg="red.main"
      rounded="full"
    >
      {value}
    </chakra.span>
  )
}

const IconWithBadge = ({ value, children }: Props) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <chakra.span pos="relative" display="inline-block">
        {children}
        {value > 0 && <Badge value={value} />}
      </chakra.span>
    </Flex>
  )
}

export default IconWithBadge
