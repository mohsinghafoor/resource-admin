import { Box, Center, Flex, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import * as Sentry from "@sentry/react"
import { GraphQLError } from "graphql"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import PageTitle from "../../components/PageTitle"
import {
  AuthPayload,
  useRequestResetMutation,
  useResetPasswordMutation,
} from "../../generated/graphql"
import { useAuth } from "../../services/auth/AuthProvider"
import { useUpdateLoginState } from "../../services/auth/utils/useUpdateLoginState"
import { ResetPasswordForm } from "./components/ResetPasswordForm"

export const RecoverAccountPage = () => {
  const email = new URL(window.location.href).searchParams.get("email") || ""
  const otp = new URL(window.location.href).searchParams.get("otp") || ""
  const origin = new URL(window.location.href).searchParams.get("origin") || ""
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const updateLoginState = useUpdateLoginState()
  const [requestReset] = useRequestResetMutation()
  const auth = useAuth()
  const [resetPassword] = useResetPasswordMutation({
    onCompleted: ({ resetPassword }) => {
      updateLoginState(resetPassword as AuthPayload)
    },
    onError: (error) => {
      setErrorMessage(error.message)
      setIsLoading(false)
    },
  })

  const requestResetFunc = useCallback(async () => {
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const result = await requestReset({ variables: { email: email } })

      if (!result.data?.requestReset) {
      }
      setSuccessMessage("Reset email sent")
    } catch (e) {
      Sentry.captureException(e)
      e.graphQLErrors.some((graphQLError: GraphQLError) => setErrorMessage(graphQLError.message))
    }
  }, [requestReset])

  const resetPasswordFunc = useCallback(
    async (values: { password: string; confirmPassword }) => {
      setSuccessMessage("")
      try {
        setIsLoading(true)
        if (origin === "guardian") {
        } else {
          await resetPassword({
            variables: {
              email: email,
              password: values.password,
              confirmPassword: values.confirmPassword,
              validateEmailToken: otp,
            },
          })
        }
      } catch (e) {
        if (e.message === "NOT NEW PASSWORD") {
          await auth.signin(email, values.password)
        }
        setIsLoading(false)
        Sentry.captureException(e)
        setErrorMessage("There was an error resetting your password. Try a new password...")
      }
      setIsLoading(false)
    },
    [resetPassword],
  )

  if (!email || !otp) {
    history.push("request-reset-password")
  }

  return (
    <Flex height="full" justify="center" bgColor="primary.softTransparent">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <PageTitle>Enter your new password</PageTitle>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            {errorMessage && (
              <>
                <Center>
                  <Text color="alert.error">{errorMessage}</Text>
                </Center>
                <Text>
                  <Link onClick={() => requestResetFunc()} color="alternate.main">
                    Resend code?
                  </Link>
                </Text>
              </>
            )}
            {successMessage && (
              <Center>
                <Text color="green">{successMessage}</Text>
              </Center>
            )}
            <ResetPasswordForm
              resetPasswordFunc={resetPasswordFunc}
              isLoading={isLoading}
              progress={progress}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
