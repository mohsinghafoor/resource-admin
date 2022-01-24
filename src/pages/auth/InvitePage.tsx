import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { GraphQLError } from "graphql"
import React, { useCallback, useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
import { useSearchParam } from "react-use"
import { AuthPayload, useAcceptInviteMutation } from "../../generated/graphql"
import { createAnalyticsTrack } from "../../services/analytics"
import { useUpdateLoginState } from "../../services/auth/utils/useUpdateLoginState"
// import { useGetMe } from "../../store/useGetMe"
import { InviteForm } from "./components/InviteForm"

export const InvitePage = () => {
  // const { me } = useGetMe()
  // const history = useHistory()
  const code = useSearchParam("code")
  const email = new URL(window.location.href).searchParams.get("email")
  const trackInvalidInviteByAmbassador = createAnalyticsTrack("client:ambassador_invalid_invite")
  const [errorMessage, setErrorMessage] = useState(!email || !code ? "Invalid invite link" : "")
  const [isLoading, setIsLoading] = useState(false)
  const updateLoginState = useUpdateLoginState()

  useEffect(() => {
    if (!email || !code)
      trackInvalidInviteByAmbassador({
        email: email || "",
        ambassadorCode: code || "",
        url: new URL(window.location.href),
      })
    setErrorMessage(!email || !code ? "Invalid invite link" : "")
  }, [email, code, trackInvalidInviteByAmbassador])

  const [acceptInvite] = useAcceptInviteMutation({
    onCompleted: ({ acceptInvite }) => {
      updateLoginState(acceptInvite as AuthPayload)
    },
    onError: (error) => {
      setErrorMessage(error.message)
      setIsLoading(false)
    },
  })

  const acceptInviteFunc = useCallback(
    async (values: { password: string }) => {
      setIsLoading(true)
      setErrorMessage("")
      try {
        if (!code || !email) {
          setIsLoading(false)
          return
        }
        const result = await acceptInvite({
          variables: { data: { code: code, email: email, password: values.password } },
        })
        if (!result.data?.acceptInvite) {
          setErrorMessage("there was a problem accepting your invite")
          return
        }
      } catch (err) {
        err.graphQLErrors.some((graphQLError: GraphQLError) =>
          setErrorMessage(graphQLError.message),
        )
      }
      setIsLoading(false)
    },
    [acceptInvite, code, email],
  )

  return (
    <Flex height="full" justify="center" bgColor="primary.softTransparent">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign="center" size="title">
            Accept Invite
          </Heading>
          <Text textAlign="center" color={"gray.600"}>
            Enter a new password to accept your invite 🚀
          </Text>
        </Stack>
        <Box width={{ base: "", md: "400px" }} arounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            {errorMessage && (
              <Center>
                <Text fontSize={"1xl"} color={"red"}>
                  {errorMessage}
                </Text>
              </Center>
            )}
            <InviteForm acceptInviteFunc={acceptInviteFunc} isLoading={isLoading} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
