import { Box, Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import * as Sentry from "@sentry/react"
import { GraphQLError } from "graphql"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import PageTitle from "../../components/PageTitle"
import { useResetOtpMutation, useVerifyOtpMutation } from "../../generated/graphql"

import { OTPForm } from "./components/OTPForm"

export const OTPPage = () => {
  const history = useHistory()

  const email = new URL(window.location.href.replace("+", "%2B")).searchParams.get("email")

  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [verifyEmail, { loading: verifyLoading, error: verifyError }] = useVerifyOtpMutation()
  const [resendOtp, { loading: resendLoading, error: resendError }] = useResetOtpMutation()

  const verifyFunc = useCallback(
    (values: { otp: string }) => {
      try {
        if (!email) return
        verifyEmail({ variables: { email: email, otp: values.otp } }).then((fetchResult) => {
          if (!fetchResult.data?.verifyOTP) {
            setErrorMessage("Invalid Code")
            return
          }
          setSuccess(true)
          setTimeout(() => {
            // refetchMeData()
            history.push("/onboarding")
          }, 1500)
        })
      } catch (e) {
        Sentry.captureException(e)
        e.graphQLErrors.some((graphQLError: GraphQLError) => setErrorMessage(graphQLError.message))
      }
    },
    [email, history, verifyEmail],
  )

  const resendFunc = useCallback(() => {
    try {
      if (!email) return
      resendOtp({ variables: { email: email } })
    } catch (e) {
      Sentry.captureException(e)
      e.graphQLErrors.some((graphQLError: GraphQLError) => setErrorMessage(graphQLError.message))
    }
  }, [email, resendOtp])

  return (
    <Flex height="full" justify="center" bgColor="primary.softTransparent">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <PageTitle>Enter passcode</PageTitle>
          <Text color={"gray.700"}>Check your email for your one time passcode 📧</Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} bg="white" p={8}>
          <Stack spacing={4}>
            {(verifyLoading || resendLoading) && (
              <Center>
                <Spinner />
              </Center>
            )}
            {errorMessage && (
              <Center>
                <Text color={"alert.error"}>{errorMessage}</Text>
              </Center>
            )}
            {success && (
              <Center>
                <Text color={"alert.success"}>Success! ✅</Text>
              </Center>
            )}
            <OTPForm
              verifyFunc={verifyFunc}
              resendFunc={resendFunc}
              setErrorMessage={setErrorMessage}
            />
            {(verifyError || resendError) && <p>Error :( Please try again</p>}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
