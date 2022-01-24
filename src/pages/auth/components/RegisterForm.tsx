import { Box, Center, Checkbox, Input, Link, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import React, { Dispatch, SetStateAction, useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import * as valid from "yup"
import Button from "../../../components/Button"
import FormikField from "../../../components/FormikField"
import { TOSModal } from "./TOSModal"

interface RegisterFormProps {
  registerFunc: (values: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<void>
}

const validation = valid.object({
  firstName: valid
    .string()
    .min(1, "Minimum of 2 characters.")
    .max(100, "Max of 100 characters")
    .required("First name is required"),
  lastName: valid
    .string()
    .min(1, "Minimum of 2 characters.")
    .max(100, "Max of 100 characters")
    .required("Last name is required"),
  email: valid.string().email("Enter a valid email").required("Email is required"),
  password: valid.string().min(8, "Minimum of 8 characters").required("Password is required"),
})

export const RegisterForm = ({ registerFunc }: RegisterFormProps) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTOS, setAcceptTOS] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAcceptTOS = () => {
    setAcceptTOS(true)
    onClose()
  }

  const navigateTo = (url: string) => {
    history.push(url)
  }

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: async (values: {
      email: string
      password: string
      firstName: string
      lastName: string
    }) => {
      setIsLoading(true)
      await registerFunc({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      setIsLoading(false)
    },
  })

  const maySignIn = useCallback(() => {
    const { email, password, firstName, lastName } = formik.values
    return !!(email && password && firstName && lastName)
  }, [acceptTOS, formik.values])

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <VStack spacing={4}>
            <FormikField formikKey="firstName" formik={formik} title="First name">
              <Input name="firstName" type="text" />
            </FormikField>
            <FormikField formikKey="lastName" formik={formik} title="Last name">
              <Input name="lastName" type="text" />
            </FormikField>
            <FormikField formikKey="email" formik={formik} title="Email address">
              <Input name="email" type="email" />
            </FormikField>
            <FormikField formikKey="password" formik={formik} title="Password">
              <Input type="password" placeholder="Password" />
            </FormikField>
            <Box display={"flex"} alignSelf={"flex-start"}>
              <Checkbox
                data-testid="accept-tos"
                isChecked={acceptTOS}
                onChange={(e) => {
                  if (!acceptTOS) {
                    onOpen()
                    return
                  }
                  setAcceptTOS(false)
                }}
              >
                Accept Terms of Service
              </Checkbox>
            </Box>
            <Center w="full" mt={4}>
              <Button
                type="submit"
                data-testid="sign-up"
                colorScheme="primary"
                isLoading={isLoading}
                isDisabled={!maySignIn() || isLoading}
              >
                Sign Up
              </Button>
            </Center>
            <Text mt="4">
              Already have an account?
              <Link ml={2} color="alternate.main" onClick={() => navigateTo("/")}>
                Login
              </Link>
            </Text>
          </VStack>
        </Form>
      </FormikProvider>
      <TOSModal handleAcceptTOS={handleAcceptTOS} onClose={onClose} isOpen={isOpen} />
    </>
  )
}
