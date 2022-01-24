import { gql, useApolloClient } from "@apollo/client"
import { useHistory, useLocation } from "react-router-dom"
import { AuthPayload } from "../../../generated/graphql"
import { createAnalyticsIdentify } from "../../analytics"
import { setAuthToken } from "../authToken"

export const useUpdateLoginState = () => {
  const history = useHistory()
  const location = useLocation()
  const client = useApolloClient()
  const captureLoginIdentify = createAnalyticsIdentify(null)

  return async (loginUser: AuthPayload) => {
    if (loginUser.authToken && loginUser.user.id) {
      setAuthToken(loginUser.authToken)
      captureLoginIdentify(loginUser.user.id)
      client.writeQuery({ query: ME, data: { me: loginUser.user } })
      const fromUrl = location?.state?.from?.pathname
      history.push(fromUrl ?? "/admin")
    }
  }
}

const ME = gql`
  query me {
    me {
      MeFields
    }
  }
`
