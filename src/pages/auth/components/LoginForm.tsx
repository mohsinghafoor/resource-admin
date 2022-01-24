import { Center, Input, Link, Text, VStack } from "@chakra-ui/react"
import * as Sentry from "@sentry/react"
import { Form, FormikProvider, useFormik } from "formik"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import * as valid from "yup"
import Button from "../../../components/Button"
import FormikField from "../../../components/FormikField"
import { useAuth } from "../../../services/auth/AuthProvider"

const validation = valid.object({
  email: valid.string().email("Enter a valid email").required("Email is required"),
  password: valid.string().required("Password is required"),
})

export const LoginForm = () => {
  const auth = useAuth()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: { email: "", password: "" },
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        setIsLoading(true)
        const { email, password } = values
        await auth.signin(email, password)
        setIsLoading(false)
      } catch (e) {
        Sentry.captureException(e)
        setIsLoading(false)
      }
    },
  })

  const maySignIn = useCallback(() => {
    const { email, password } = formik.values
    return !!(email && password)
  }, [formik])

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <VStack spacing={4}>
            <FormikField formikKey="email" formik={formik} title="Email address">
              <Input type="email" placeholder="Email" />
            </FormikField>
            <FormikField formikKey="password" formik={formik} title="Password">
              <Input type="password" placeholder="Password" />
            </FormikField>
          </VStack>
          <Center w="full" mt={4}>
            <Button
              data-testid="sign-in"
              type="submit"
              colorScheme="primary"
              isLoading={isLoading}
              isDisabled={!maySignIn()}
            >
              Sign in
            </Button>
          </Center>

          <Text mt="4">
            Don't have an account yet?
            <Link ml={2} color="alternate.main" onClick={() => history.push("/register")}>
              Sign up
            </Link>
          </Text>
          <Text mt="4">
            <Link color="alternate.main" onClick={() => history.push("/request-reset-password")}>
              Forgot password?
            </Link>
          </Text>
        </Form>
      </FormikProvider>
    </>
  )
}
