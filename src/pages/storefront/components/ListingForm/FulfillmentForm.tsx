import { Input } from "@chakra-ui/input"
import { Stack, HStack } from "@chakra-ui/layout"
import { NumberInput, NumberInputField, Switch, FormControl, FormLabel } from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/textarea"
import { Form, FormikProvider, useFormik } from "formik"
// import { useGetMe } from "../../../../store/useGetMe"
import Button from "../../../../components/Button"
import * as valid from "yup"
import FormikField from "../../../../components/FormikField"
import { PlacesAutocomplete } from "../../../../components/PlacesAutocomplete"
import { Listing, ListingType } from "../../../../generated/graphql"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TopNav } from "./TopNav"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FormEvent, useState } from "react"

const validationSchema = valid.object({
  isVirtual: valid.boolean(),
  isLocal: valid.boolean(),
  isDeliverable: valid.boolean(),
  offered: valid.boolean().when(["isVirtual", "isLocal", "isDeliverable"], {
    is: (isVirtual, isLocal, isDeliverable) => !isVirtual && !isLocal && !isDeliverable,
    then: valid.boolean().required("Select at least one"),
  }),
})

interface FormValues {
  isVirtual?: boolean
  isLocal?: boolean
  address?: string
  quantity?: number
  availability?: string
  calendarLink?: string
  isDeliverable?: boolean
  deliveryNotes?: string
}

interface FulfillmentFormProps {
  listing?: Listing
  selectedListingType?: ListingType
  currentStep: number
  next: (formData: FormValues, step: number) => void
  onKeyDown: (e: FormEvent<HTMLFormElement>) => void
  back: () => void
}

export const FulfillmentForm = ({
  listing,
  selectedListingType,
  next,
  back,
  onKeyDown,
  currentStep,
}: FulfillmentFormProps) => {
  const { isVirtual, isLocal, isDeliverable, address, deliveryNotes, availability, calendarLink } =
    (listing ?? {}) as Listing

  const [withStep, setWithStep] = useState(0)
  const formik = useFormik({
    initialValues: {
      isVirtual: isVirtual ?? false,
      isLocal: isLocal ?? false,
      isDeliverable: isDeliverable ?? false,

      deliveryNotes: deliveryNotes ?? "",
      availability: availability ?? "",
      calendarLink: calendarLink ?? "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    isInitialValid: true,

    onSubmit: async (values: FormValues) => {
      const formData = {
        isVirtual: values.isVirtual,
        isLocal: values.isLocal,
        isDeliverable: values.isDeliverable,
        address: values.address,
        deliveryNotes: values.deliveryNotes,
        availability: values.availability,
        calendarLink: values.calendarLink,
      }
      next(formData, withStep)
    },
  })

  return (
    <>
      <TopNav
        currentStep={currentStep}
        onClick={(step) => {
          setWithStep(step)
          formik.submitForm()
        }}
      />
      <FormikProvider value={formik}>
        <Form onKeyDown={onKeyDown}>
          <FormikField formikKey="offered" formik={formik} title="Fulfillment method">
            <Stack>
              <HStack>
                <FormControl display="flex" alignItems="center" width="50%">
                  <Switch
                    data-testid="fulfillment_on_location"
                    mr={4}
                    size="md"
                    isChecked={formik.values.isLocal || false}
                    onChange={() =>
                      formik.setValues({ ...formik.values, isLocal: !formik.values.isLocal })
                    }
                  />
                  <FormLabel noOfLines={1}>
                    {selectedListingType === ListingType.Product ? "Pick-up" : "On location"}
                  </FormLabel>
                </FormControl>
                {formik.values.isLocal && (
                  <FormikField formikKey="address" formik={formik}>
                    <PlacesAutocomplete
                      placeholder="Default: Business Address"
                      value={formik.values.address}
                      onSelect={(val) => formik.setFieldValue("address", val)}
                      onChange={(e) => formik.setFieldValue("address", e.target.value)}
                    />
                  </FormikField>
                )}
              </HStack>
              <FormControl display="flex" alignItems="center">
                <Switch
                  data-testid="fulfillment_delivery"
                  mr={4}
                  size="md"
                  isChecked={formik.values.isDeliverable || false}
                  onChange={() =>
                    formik.setValues({
                      ...formik.values,
                      isDeliverable: !formik.values.isDeliverable,
                    })
                  }
                />
                <FormLabel>Delivery</FormLabel>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <Switch
                  data-testid="fulfillment_virtual"
                  mr={4}
                  size="md"
                  isChecked={formik.values.isVirtual || false}
                  onChange={() =>
                    formik.setValues({
                      ...formik.values,
                      isVirtual: !formik.values.isVirtual,
                    })
                  }
                />
                <FormLabel>Virtual</FormLabel>
              </FormControl>
            </Stack>
          </FormikField>
          <FormikField
            formikKey="deliveryNotes"
            formik={formik}
            title="Delivery notes"
            description="any relevant details (ex: shipping costs)"
          >
            <Textarea placeholder="" />
          </FormikField>
          {selectedListingType !== ListingType.Product ? (
            <>
              <FormikField
                formikKey="availability"
                formik={formik}
                title="Availability"
                description="Add your availability"
              >
                <Input placeholder="8am-3pm Monday-Friday" />
              </FormikField>
              <FormikField
                formikKey="calendarLink"
                formik={formik}
                title="Calendar link"
                description="Add your calendar link"
              >
                <Input placeholder="https://calendly.com/" />
              </FormikField>
            </>
          ) : (
            <HStack width={"100%"}>
              <FormikField formikKey="quantity" formik={formik} title="Quantity available">
                <NumberInput
                  name="quantity"
                  min={0}
                  onChange={(val) => formik.setFieldValue("quantity", Number(val))}
                >
                  <NumberInputField />
                </NumberInput>
              </FormikField>
            </HStack>
          )}
          <HStack width="100%" justifyContent="flex-end" mt={6}>
            <Button
              variant="outline"
              onClick={() => back()}
              leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              Back
            </Button>
            <Button
              data-testid="btn_set_pricing"
              variant="primary"
              colorScheme="primary"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              type="submit"
            >
              Set pricing
            </Button>
          </HStack>
        </Form>
      </FormikProvider>
    </>
  )
}
