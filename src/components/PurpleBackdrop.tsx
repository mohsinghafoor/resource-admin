import { Box, BoxProps } from "@chakra-ui/react"

interface Props extends BoxProps {
  showBackdrop?: boolean
}

export const PurpleBackdrop = ({ showBackdrop = true, children, ...rest }: Props) => {
  if (showBackdrop === false) return <>{children}</>
  return (
    <Box
      mt={-4}
      pt={{ base: 0, sm: 8 }}
      pb={8}
      minHeight="calc(100vh - 221px)" // meh
      zIndex={-1}
      bgColor="primary.softTransparent"
      {...rest}
    >
      {children}
    </Box>
  )
}
