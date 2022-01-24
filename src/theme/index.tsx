import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import components from "./components"
import foundations from "./foundations"
import { styles as globalStyles } from "./styles"
import { textStyles } from "./textStyles"
import { layerStyles } from "./layerStyles"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const overrides: any = {
  ...foundations,
  components,
  styles: globalStyles,
  textStyles,
  layerStyles,
}

const resourceTheme = extendTheme(overrides)

export const ThemeProvider = (props) => {
  return <ChakraProvider theme={resourceTheme}>{props.children}</ChakraProvider>
}
