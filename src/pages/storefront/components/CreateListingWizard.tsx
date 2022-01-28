import { useState } from "react"
import { Box } from "@chakra-ui/layout"
import { BoxProps, Heading } from "@chakra-ui/react"
import { Listing, ListingType } from "../../../generated/graphql"
import { ListingFormWizard } from "./ListingForm/ListingFormWizard"

interface CreateListingWizardProps extends BoxProps {
  onSave: (listing?: Listing) => void
  onCancel?: () => void
  changeListingType?: (selectedListingType: ListingType) => void
  listing?: Listing
  selectedListingType: ListingType | undefined
}

export const CreateListingWizard = ({
  onSave,
  listing,
  selectedListingType,
  ...rest
}: CreateListingWizardProps) => {
  // component state
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <Box {...rest}>
      <Heading data-testid="listing_wizard_title" size={"lg"} mb={4}>
        {listing ? `Edit ${listing.title}` : `New ${selectedListingType?.toLowerCase()}`}
      </Heading>
      <ListingFormWizard
        selectedListingType={selectedListingType}
        currentStep={currentStep}
        setCurrentStep={(step) => setCurrentStep(step)}
        listing={listing}
        onSave={onSave}
      />
    </Box>
  )
}
