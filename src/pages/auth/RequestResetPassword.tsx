import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react"
import * as Sentry from "@sentry/react"
import { GraphQLError } from "graphql"
import { useCallback, useState } from "react"
import PageTitle from "../../components/PageTitle"
import { useRequestResetMutation } from "../../generated/graphql"
import { RequestResetForm } from "./components/RequestResetForm"

export const RequestResetPassword = () => {
  const [currentEmail, setCurrentEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [requested, setRequested] = useState(true)
  const [requestReset] = useRequestResetMutation()

  const requestResetFunc = useCallback(
    async (values: { email: string }) => {
      setIsLoading(true)
      setErrorMessage("")
      try {
        await requestReset({ variables: { email: values.email } })

        setSuccessMessage("Reset email sent")
        setCurrentEmail(values.email)
        setRequested(false)
      } catch (e) {
        Sentry.captureException(e)
        e.graphQLErrors.some((graphQLError: GraphQLError) => setErrorMessage(graphQLError.message))
      }
      setIsLoading(false)
    },
    [requestReset],
  )

  return (
    <Flex height="full" justify="center" bgColor="primary.softTransparent">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <PageTitle>Password reset</PageTitle>
          <Text textAlign="center">
            {requested
              ? "Enter your email so we can send you a password reset link"
              : "We sent you an email with your password reset link!"}{" "}
            🔑
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} bg="white" p={8}>
          <Stack spacing={4}>
            {errorMessage && <Text color="alert.error">{errorMessage}</Text>}
            {successMessage && (
              <Text color="alert.success">Reset email sent! Check your email</Text>
            )}
            {requested ? (
              <RequestResetForm requestResetFunc={requestResetFunc} isLoading={isLoading} />
            ) : (
              <>
                <Text>
                  Didn't get an email?{" "}
                  <Link
                    onClick={async () => await requestResetFunc({ email: currentEmail })}
                    color="alternate.main"
                  >
                    Resend Code
                  </Link>
                </Text>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
