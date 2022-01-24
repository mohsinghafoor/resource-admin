import { Center, Input, VStack, Text, Progress, Container } from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import React from "react"
import * as valid from "yup"
import Button from "../../../components/Button"
import FormikField from "../../../components/FormikField"

const validation = valid.object({
  password: valid
    .string()
    .min(2, "Minimum of 2 characters")
    .max(50, "Maximum of 50 characters")
    .required("Password is required"),
  confirmPassword: valid
    .string()
    .min(2, "Minimum of 2 characters")
    .max(50, "Maximum of 50 characters")
    .required("Password is required")
    .oneOf([valid.ref("password"), null], "Passwords must match"),
})

interface ResetPasswordFormProps {
  resetPasswordFunc: (values: { password: string; confirmPassword: string }) => void
  isLoading: boolean
  progress: number
}

export const ResetPasswordForm = ({
  resetPasswordFunc,
  isLoading,
  progress,
}: ResetPasswordFormProps) => {
  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values: { password: string; confirmPassword: string }) => {
      await resetPasswordFunc({
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
    },
  })

  return (
    <FormikProvider value={formik}>
      <Form>
        <VStack spacing={3}>
          <FormikField formikKey="password" formik={formik} title="New password">
            <Input type="password" placeholder="New password" autocomplete="new-password" />
          </FormikField>
          <FormikField formikKey="confirmPassword" formik={formik} title="Confirm password">
            <Input type="password" placeholder="Confirm new password" autocomplete="new-password" />
          </FormikField>
          {isLoading && (
            <Text>Do not close the window or navigate away until the operation completes</Text>
          )}
          <Center w="full" mt={4}>
            <Button isLoading={isLoading} type="submit" colorScheme="primary">
              Reset password
            </Button>
          </Center>
          {isLoading && (
            <VStack w="100%">
              <Container zIndex={"100"}>
                <Container mt="10px" py="10px" px="10px">
                  <Progress hasStripe value={progress} colorScheme="primary" />
                </Container>
              </Container>
            </VStack>
          )}
        </VStack>
      </Form>
    </FormikProvider>
  )
}
