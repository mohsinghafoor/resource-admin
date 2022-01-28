import { Center, Spinner, Text, HStack } from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import { FormEvent, useRef, useState } from "react"
import Button from "../../../../components/Button"
import * as valid from "yup"
import CloudinaryImage from "../../../../components/CloudinaryImage"
import { TopNav } from "./TopNav"
import ImageUploadWrapper, { UploadHandle } from "../../../../components/UploadWrapper"
import FormikField from "../../../../components/FormikField"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Listing } from "../../../../generated/graphql"

const validationSchema = valid.object({
  imageUrl: valid.string(),
})

interface ImagesFormProps {
  listing?: Listing
  isNewListing?: boolean
  title?: string
  next: (formData: FormValues, step: number) => void
  back: () => void
  setIsLoading: (val: boolean) => void
  onKeyDown: (e: FormEvent<HTMLFormElement>) => void
  setCurrentStep: (step: number) => void
  isLoading: boolean
  currentStep: number
}

interface FormValues {
  imageUrl?: string
}

export const ImagesForm = ({
  listing,
  title,
  isNewListing,
  isLoading,
  next,
  back,
  setIsLoading,
  onKeyDown,
  setCurrentStep,
  currentStep,
}: ImagesFormProps) => {
  const { imageUrl } = (listing ?? {}) as Listing
  const imageUploadRef = useRef<UploadHandle>(null)

  const formik = useFormik({
    initialValues: {
      imageUrl: imageUrl ?? "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async () => {
      if (!imageUploadRef.current) return null
      setIsLoading(true)
      const { data } = await imageUploadRef.current.handleSave()
      const formData = {
        imageUrl: data.url,
      }
      next(formData, 0)
    },
  })

  return (
    <>
      <TopNav currentStep={currentStep} onClick={(step) => setCurrentStep(step)} />
      <FormikProvider value={formik}>
        <Form onKeyDown={onKeyDown}>
          <FormikField formikKey="imageUrl" formik={formik} title="Image">
            <ImageUploadWrapper
              ref={imageUploadRef}
              onFileAdded={({ data }) => {
                formik.values.imageUrl = data.url
              }}
              isListing={true}
              minHeight="500"
            >
              <CloudinaryImage
                src={imageUrl ?? ""}
                alt="listing image..."
                h="500px"
                textAlign="center"
                width="full"
                fit="cover"
                title={title}
                fallback={
                  <Center>
                    <Spinner />
                  </Center>
                }
              />
            </ImageUploadWrapper>
          </FormikField>

          <Text style={{ margin: 0 }}>Optimal image size: 840px x 840px</Text>
          <HStack width="100%" justifyContent="flex-end" mt={6}>
            <Button
              variant="outline"
              onClick={() => back()}
              leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              Back
            </Button>
            <Button
              data-testid="btn_listing_apply"
              variant="primary"
              colorScheme="primary"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              type="submit"
              isLoading={isLoading}
            >
              {isNewListing ? "Add to my storefront" : "Update listing"}
            </Button>
          </HStack>
        </Form>
      </FormikProvider>
    </>
  )
}
