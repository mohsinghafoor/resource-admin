import {
  ApolloClient,
  ApolloProvider as Provider,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client"
import React from "react"
import { getApolloLink } from "./apolloLink"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    errorPolicy: "ignore",
  },
  query: {
    errorPolicy: "all",
  },
}

export const cache: InMemoryCache = new InMemoryCache()

const ApolloProvider = (props) => {
  const link = getApolloLink()
  const client = new ApolloClient({
    link,
    cache,
    defaultOptions,
    connectToDevTools: true,
  })

  return <Provider client={client}>{props.children}</Provider>
}

export default ApolloProvider
