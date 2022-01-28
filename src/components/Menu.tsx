import { Text } from "@chakra-ui/layout"
import { MenuButton as ChakraMenuButton } from "@chakra-ui/menu"
import { Button, ButtonProps } from "@chakra-ui/react"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface Props extends ButtonProps {
  isOpen?: boolean
}

export const MenuButton = ({ isOpen, children, ...rest }: Props) => {
  return (
    <ChakraMenuButton
      as={Button}
      variant="menu"
      rightIcon={<FontAwesomeIcon color="gray" icon={isOpen ? faChevronUp : faChevronDown} />}
      justifyContent="space-between"
      {...rest}
    >
      <Text textAlign="left">{children}</Text>
    </ChakraMenuButton>
  )
}
