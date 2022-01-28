import { Box, Center, keyframes, Spinner } from "@chakra-ui/react"
import React from "react"
import colors from "../theme/foundations/colors"

const CenteredSpinner = (props) => (
  <Center w="full" {...props}>
    <Spinner />
  </Center>
)
type Keyframe = ReturnType<typeof keyframes>

export const scaling: Keyframe = keyframes({
  "0%": {
    transform: "scale(0.2)",
    backgroundColor: colors.purple.light,
  },
  "40%": {
    transform: "scale(1)",
    backgroundColor: colors.purple.main,
  },
  "50%": {
    transform: "scale(1)",
    backgroundColor: colors.purple.dark,
  },
})

const styles = {
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  transform: "scale(0)",
  backgroundColor: colors.orange.dark,
  animation: `${scaling} 2.5s ease-in-out infinite`,
  display: "inline-block",
  margin: "0.5rem",
}

export const LoadingEllipses = (props) => {
  return (
    <Center w="full" h="full" {...props}>
      <Box {...styles} sx={{ animationDelay: "0s" }} />
      <Box {...styles} sx={{ animationDelay: "0.2s" }} />
      <Box {...styles} sx={{ animationDelay: "0.4s" }} />
      <Box {...styles} sx={{ animationDelay: "0.6s" }} />
      <Box {...styles} sx={{ animationDelay: "0.8s" }} />
    </Center>
  )
}

export default CenteredSpinner
