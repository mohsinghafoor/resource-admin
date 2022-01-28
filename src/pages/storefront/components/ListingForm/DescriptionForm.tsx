import { Input } from "@chakra-ui/input"
import { VStack, HStack } from "@chakra-ui/layout"
import { RichTextEditor } from "../../../../components/RichTextEditor"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, FormikProvider, useFormik } from "formik"
import * as valid from "yup"
import { TopNav } from "./TopNav"
import Button from "../../../../components/Button"
import { InputTag } from "../../../../components/InputTag"
import { CategoryMenu } from "../../../../components/CategoryMenu"
import FormikField from "../../../../components/FormikField"
import { Listing, Maybe } from "../../../../generated/graphql"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FormEvent, useState } from "react"

const CHARACTER_LIMIT = 10000

const validationSchema = valid.object({
  title: valid
    .string()
    .min(2, "Minimum of 2 characters")
    .max(100, "Max of 100 characters")
    .required(),
  description: valid
    .string()
    .min(2, "Minimum of 2 characters")
    .max(CHARACTER_LIMIT, `Max of ${CHARACTER_LIMIT} characters`)
    .required("Description is required"),
  tags: valid.array().min(0).max(3, "Maximum 3 tags").required(),
})

interface FormValues {
  title?: string
  description?: string
  categoryId?: string | null
  category?: string
  subcategory?: string
  tags?: Maybe<string>[]
}

interface DescriptionFormProps {
  listing?: Listing
  next: (formData: FormValues, step: number) => void
  onKeyDown: (e: FormEvent<HTMLFormElement>) => void
  back: () => void
  currentStep: number
}
export const DescriptionForm = ({
  listing,
  next,
  onKeyDown,
  currentStep,
}: DescriptionFormProps) => {
  const { title, description, categoryId, tags } = (listing ?? {}) as Listing
  const [withStep, setWithStep] = useState(0)
  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      description: description ?? "",
      category: "",
      subcategory: "",
      tags: tags ?? [],
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values: FormValues) => {
      const formData = {
        title: values.title?.replace(/  +/g, " ").trim(),
        description: values.description,
        categoryId: values.subcategory || values.category || values.categoryId,
        tags: values.tags,
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
          <VStack my={4} align="flex-start">
            <FormikField
              formikKey="title"
              formik={formik}
              title="Title"
              description="Add a title to let your customers know what your business offers"
            >
              <Input placeholder="Title" />
            </FormikField>
            <FormikField formikKey="description" formik={formik} title="Describe your listing">
              <RichTextEditor
                placeholder="Listing description"
                value={formik.values.description}
                onChange={(val) => formik.setFieldValue("description", val)}
              />
            </FormikField>
            <FormikField formikKey="category" formik={formik} title="Category">
              <CategoryMenu
                categoryId={categoryId as string}
                onSelect={(category) => formik.setFieldValue("category", category)}
              />
            </FormikField>
            <FormikField
              formikKey="tags"
              formik={formik}
              title="Tags (choose up to three)"
              description="press “enter” to add tag"
            >
              <InputTag
                values={formik.values.tags as string[]}
                onChange={(updatedTags) => formik.setFieldValue("tags", updatedTags)}
              />
            </FormikField>
          </VStack>
          <HStack width="100%" justifyContent="flex-end" mt={6}>
            <Button
              data-testid="btn_fulfillment_info"
              variant="primary"
              colorScheme="primary"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              type="submit"
            >
              Fulfillment info
            </Button>
          </HStack>
        </Form>
      </FormikProvider>
    </>
  )
}
