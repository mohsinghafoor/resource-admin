import { BoxProps, HeadingProps } from "@chakra-ui/layout"
import { Link } from "react-router-dom"

export const baseThumbnailStyles: BoxProps = {
  as: Link,
  cursor: "pointer",
  rounded: "2xl",
}

export const headingStyle: HeadingProps = {
  color: "white",
  h: "70px",
  fontSize: "36px",
  textAlign: "center",
  alignSelf: "center",
  border: "6px solid transparent",
  _hover: {
    background: "white",
    color: "black",
    borderRadius: 15,
    border: "6px solid #699DFF",
  },
  fontWeight: "600",
}
