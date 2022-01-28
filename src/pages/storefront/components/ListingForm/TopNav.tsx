import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

interface TopNavProps {
  currentStep: number
  onClick: (step: number) => void
}

export const TopNav = ({ currentStep, onClick }: TopNavProps) => {
  const changeStep = (step) => {
    if (currentStep === step) return
    onClick(step)
  }

  return (
    <Breadcrumb mb={8}>
      <BreadcrumbItem>
        <BreadcrumbLink
          _hover={{ textDecoration: "none" }}
          color={currentStep >= 1 ? "#000" : "#8e8e8e"}
          fontWeight={currentStep === 1 ? "bold" : "500"}
          onClick={() => changeStep(1)}
        >
          Description
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          _hover={{ textDecoration: "none" }}
          color={currentStep >= 2 ? "#000" : "#8e8e8e"}
          fontWeight={currentStep === 2 ? "bold" : "500"}
          onClick={() => changeStep(2)}
        >
          Fulfillment
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          _hover={{ textDecoration: "none" }}
          color={currentStep >= 3 ? "#000" : "#8e8e8e"}
          fontWeight={currentStep === 3 ? "bold" : "500"}
          onClick={() => changeStep(3)}
        >
          Price
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          _hover={{ textDecoration: "none" }}
          color={currentStep === 4 ? "#000" : "#8e8e8e"}
          fontWeight={currentStep === 4 ? "bold" : "500"}
          onClick={() => changeStep(4)}
        >
          Images
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
