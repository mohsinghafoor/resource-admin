import { Center, Input, VStack } from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import React from "react"
import * as valid from "yup"
import Button from "../../../components/Button"
import FormikField from "../../../components/FormikField"

interface RequestResetFormProps {
  requestResetFunc: (values: { email: string }) => void
  isLoading: boolean
}

const validation = valid.object({
  email: valid.string().email("Enter a valid email").required("Email is required"),
})

export const RequestResetForm = ({ requestResetFunc, isLoading }: RequestResetFormProps) => {
  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validation,
    initialValues: { email: "" },
    onSubmit: async (values: { email: string }) => {
      await requestResetFunc({ email: values.email })
    },
  })

  return (
    <FormikProvider value={formik}>
      <Form>
        <VStack spacing={4}>
          <FormikField formikKey="email" formik={formik} title="Email address">
            <Input type="email" placeholder="Email" />
          </FormikField>
          <Center w="full" mt={4}>
            <Button isLoading={isLoading} type="submit" colorScheme="primary">
              Send code
            </Button>
          </Center>
        </VStack>
      </Form>
    </FormikProvider>
  )
}
