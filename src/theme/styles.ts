import { Styles } from "@chakra-ui/theme-tools"

export const styles: Styles = {
  global: {
    html: {
      height: "full",
    },
    body: {
      overflowX: "hidden !important",
      "min-height": "full",
    },
    "*::placeholder": {
      color: "gray.500",
    },
    "#root": {
      display: "flex",
      flexDir: "column",
      height: "100vh",
    },
  },
}

export const IconStyles = {
  sendIcon: {
    paddingLeft: 10,
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}
