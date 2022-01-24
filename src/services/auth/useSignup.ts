import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { AuthPayload, UserCreateInput, useRegisterUserMutation } from "../../generated/graphql"
import { createAnalyticsIdentify } from "../analytics"
import { useUpdateLoginState } from "./utils/useUpdateLoginState"

export const useSignup = () => {
  const toast = useToast()
  const history = useHistory()
  const updateLoginState = useUpdateLoginState()
  const captureRegisterIdentify = createAnalyticsIdentify(null)

  const [registerUser] = useRegisterUserMutation({
    onCompleted: ({ registerUser }) => {
      updateLoginState(registerUser as AuthPayload)
      captureRegisterIdentify(registerUser.user.id)
    },
    onError: (error) => {
      if (error.message) {
        return toast({ status: "error", description: error.message, position: "top" })
      }
    },
  })

  return useCallback(
    async (inputArgs: UserCreateInput) => {
      const res = await registerUser({ variables: { data: inputArgs } })
      if (!res.errors) history.push({ pathname: `/otp`, search: `email=${inputArgs.email}` })
    },
    [registerUser],
  )
}
