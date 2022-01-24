import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { AuthPayload, useLoginUserMutation } from "../../generated/graphql"
import { useUpdateLoginState } from "./utils/useUpdateLoginState"

export const useSignin = () => {
  const toast = useToast()
  const history = useHistory()
  const updateLoginState = useUpdateLoginState()
  const [login] = useLoginUserMutation({
    onCompleted: ({ loginUser }) => {
      if (loginUser.authToken) updateLoginState(loginUser as AuthPayload)
    },
    onError: (error) => {
      if (error.message.toLowerCase() === "password reset required") {
        return history.push("/request-reset-password")
      }
      if (error.message) {
        return toast({ status: "error", description: error.message, position: "top" })
      }
    },
  })

  return useCallback(
    async (email: string, password: string) => {
      await login({ variables: { email, password } })
    },
    [login],
  )
}
