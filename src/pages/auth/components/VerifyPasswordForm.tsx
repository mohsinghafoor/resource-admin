import { Center, Input, VStack, Text, Link, Heading } from "@chakra-ui/react"
import { faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Sentry from "@sentry/react"
import { Form, FormikProvider, useFormik } from "formik"
import React, { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import * as valid from "yup"
import Button from "../../../components/Button"
import FormikField from "../../../components/FormikField"

const validation = valid.object({
  password: valid.string().required("Password is required"),
})

interface Props {
  onSubmit: ({ password }: { password: string }) => Promise<void>
  firstFieldRef?: any
  activate: boolean
}

export const VerifyPasswordForm = ({ onSubmit, firstFieldRef, activate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: { email: "", password: "" },
    onSubmit: async ({ password }: { password: string }) => {
      try {
        setIsLoading(true)
        await onSubmit({ password })
        setIsLoading(false)
      } catch (e) {
        Sentry.captureException(e)
        setIsLoading(false)
      }
    },
  })

  const maySignIn = useCallback(() => {
    const { password } = formik.values
    return !!password
  }, [formik])

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Center>
            <Heading ml={2} size="title">
              {activate ? "Activate wallet" : "Unlock wallet"}
            </Heading>
          </Center>
          <VStack spacing={4}>
            <FormikField
              formikKey="password"
              formik={formik}
              title="Verify password"
              description="verify your password to activate your wallet"
            >
              <Input
                ref={firstFieldRef}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </FormikField>
            <Text alignSelf={"flex-start"} marginLeft={"1em !important"} textStyle="border">
              {activate
                ? "Your password is needed to activate your wallet."
                : "Your password is needed to unlock your wallet. You only need to do this once per session."}
            </Text>
          </VStack>
        </Form>
        <Center m={activate ? "0em" : "2em 0em !important"}>
          <Text mt="4">
            <Link color="alternate.main" onClick={() => history.push("/request-reset-password")}>
              Forgot password?
            </Link>
          </Text>
        </Center>
        <VStack m={"2em 1em 1em 1em"} alignSelf={activate ? "center" : "flex-end"}>
          <Button
            type="submit"
            colorScheme="primary"
            isLoading={isLoading}
            isDisabled={!maySignIn()}
            onClick={formik.submitForm}
            leftIcon={<FontAwesomeIcon icon={faWallet} />}
          >
            {activate ? "Activate wallet" : "Unlock wallet"}
          </Button>
        </VStack>
      </FormikProvider>
    </>
  )
}
