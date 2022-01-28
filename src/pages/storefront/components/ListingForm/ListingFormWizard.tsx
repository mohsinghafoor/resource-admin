import { Box } from "@chakra-ui/layout"
import { BoxProps } from "@chakra-ui/react"
import { useState } from "react"
import {
  Listing,
  useCreateListingMutation,
  useToggleListingMutation,
  useUpdateListingMutation,
  ListingType,
  Maybe,
} from "../../../../generated/graphql"
import { createAnalyticsTrack } from "../../../../services/analytics/config"
// import { useGetMe } from "../../../../store/useGetMe"
import { DescriptionForm } from "./DescriptionForm"
import { FulfillmentForm } from "./FulfillmentForm"
import { PriceForm } from "./PriceForm"
import { ImagesForm } from "./ImagesForm"

interface ListingFormWizardProps extends BoxProps {
  onSave?: (listing?: Listing) => void
  onDelete?: (listingId: string) => void
  onCancel?: () => void
  changeListingType?: (selectedListingType: ListingType) => void
  listing?: Listing
  selectedListingType: ListingType | undefined
  currentStep: number
  setCurrentStep: (step: number) => void
}

interface FormValues {
  title?: string
  description?: string
  cost?: number
  minPrice?: number
  maxPrice?: number
  categoryId?: string | null
  imageUrl?: string
  isVirtual?: boolean
  isLocal?: boolean
  address?: string
  quantity?: number
  availability?: string
  calendarLink?: string
  isDeliverable?: boolean
  deliveryNotes?: string
  type?: ListingType
  category?: string
  subcategory?: string
  tags?: Maybe<string>[]
}

export const ListingFormWizard = ({
  onSave,
  listing,
  selectedListingType,
  currentStep,
  setCurrentStep,
}: ListingFormWizardProps) => {
  const listingId = listing?.id
  const isNewListing = !listingId
  const trackNewListingEvent = createAnalyticsTrack("client:listing_created")
  const trackUpdateListingEvent = createAnalyticsTrack("client:listing_updated")

  // API calls

  const [createListing] = useCreateListingMutation()
  const [updateListing, { loading: updateLoading }] = useUpdateListingMutation()
  const [toggleListing, { loading: toggleLoading }] = useToggleListingMutation()

  // component state
  const [localListing, setLocalListing] = useState(listing)
  const [isLoading, setIsLoading] = useState(false)
  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const nextStep = async (formData: FormValues, step) => {
    const updatedListing = { ...localListing, ...formData } as Listing
    setLocalListing(updatedListing)
    if (step !== 0) return setCurrentStep(step)
    if (currentStep === 4) {
      const formData = {
        title: localListing?.title,
        description: localListing?.description,
        cost: localListing?.cost,
        imageUrl: updatedListing?.imageUrl,
        categoryId: localListing?.categoryId,
        isVirtual: localListing?.isVirtual,
        isLocal: localListing?.isLocal,
        isDeliverable: localListing?.isDeliverable,
        address: localListing?.isLocal ? localListing?.address : "",
        deliveryNotes: localListing?.deliveryNotes,
        availability: localListing?.availability,
        calendarLink: localListing?.calendarLink,
        minPrice: localListing?.minPrice,
        maxPrice: localListing?.maxPrice,
        type: selectedListingType,
        tags: localListing?.tags,
        quantity: localListing?.quantity,
      }
      let mutationId
      if (isNewListing) {
        trackNewListingEvent({})
        const res = await createListing({
          variables: {},
        })
        mutationId = res.data?.createListing.id
      } else {
        trackUpdateListingEvent({})
        const res = await updateListing({
          variables: {
            data: formData,
            id: listingId ?? "",
          },
        })
        mutationId = res.data?.updateListing?.id
      }
      onSave?.({ ...formData, id: mutationId } as Listing)
      setIsLoading(false)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }
  return (
    <>
      <Box my={4} spacing={6} align="flex-start" width="100%">
        {currentStep === 1 && (
          <DescriptionForm
            listing={localListing}
            next={(values, step) => nextStep(values, step)}
            back={() => handleBack()}
            onKeyDown={onKeyDown}
            currentStep={currentStep}
          />
        )}
        {currentStep === 2 && (
          <FulfillmentForm
            listing={localListing}
            next={(values, step) => nextStep(values, step)}
            back={() => handleBack()}
            onKeyDown={onKeyDown}
            currentStep={currentStep}
          />
        )}
        {currentStep === 3 && (
          <PriceForm
            listing={localListing}
            next={(values, step) => nextStep(values, step)}
            back={() => handleBack()}
            onKeyDown={onKeyDown}
            currentStep={currentStep}
          />
        )}
        {currentStep === 4 && (
          <ImagesForm
            listing={localListing}
            next={(values, step) => nextStep(values, step)}
            setCurrentStep={(step) => setCurrentStep(step)}
            back={() => handleBack()}
            isNewListing={isNewListing}
            isLoading={isLoading}
            setIsLoading={(val) => setIsLoading(val)}
            onKeyDown={onKeyDown}
            currentStep={currentStep}
            title={localListing?.title ?? ""}
          />
        )}
      </Box>
    </>
  )
}
