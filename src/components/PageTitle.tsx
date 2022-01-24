import { HeadingProps } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface PageTitleProps extends HeadingProps {
  documentTitle?: string
}

const PageTitle = ({ children, documentTitle, size, ...rest }: PageTitleProps) => {
  document.title = getPageTitle(documentTitle ?? children)

  return (
    <Heading size={size ?? "title"} {...rest}>
      {children}
    </Heading>
  )
}

export default PageTitle

export const getPageTitle = (title: ReactNode) => {
  if (typeof title !== "string") return "ReSource Network"
  return `${title} | ReSource Network`
}
