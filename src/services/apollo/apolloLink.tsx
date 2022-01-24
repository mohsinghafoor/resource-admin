import { ApolloLink, HttpLink } from "@apollo/client"
import config from "../../config"
import { getAuthToken } from "../auth/authToken"
import { sentryErrorLink } from "../sentry"

const httpEndpoint =
  config.API_ENDPOINTS.GRAPHQL || "https://staging-api.resourcenetwork.co/graphql"

const httpLink = new HttpLink({
  uri: "https://staging-api.resourcenetwork.co/graphql",
  credentials: "include",
})

export const getApolloLink = () => {
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => {
      const authToken = getAuthToken()
      return { headers: { Authorization: authToken ? `Bearer ${authToken}` : "" } }
    })
    return forward(operation)
  })

  const httpLinkAuth = middlewareLink.concat(httpLink)

  return ApolloLink.from([sentryErrorLink, httpLinkAuth])
}
