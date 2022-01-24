import { useToast } from "@chakra-ui/react"
import axios from "axios"
import jwtDecode, { JwtPayload } from "jwt-decode"
import { now as getNow } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { config } from "../../config"
import { setAuthToken } from "./authToken"

export const fetchRefreshToken = async () => {
  return axios({
    method: "POST",
    url: config.API_ENDPOINTS.REFRESH_TOKEN,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
}

export const deleteRefreshToken = async () => {
  return axios({
    method: "POST",
    url: config.API_ENDPOINTS.DELETE_TOKEN,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
}

// this hook manages the two scenarios where client needs to fetch a refresh token from the API so
// that network calls don't become unauthenticated over time due to jwt expiration:
// 1. on load of this hook -- this occurs when the AuthProvider loads, which will persist
// sessions when the user refreshes the page
// 2. one minute before the most recently fetched auth token expires
export const useFetchRefreshTokenIfNecessary = () => {
  const toast = useToast()
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState<number>()
  const [initialFetchDone, setInitialFetchDone] = useState(false)

  const fetchToken = useCallback(async () => {
    try {
      const authToken = (await fetchRefreshToken()).data?.authToken
      if (!authToken) return // maybe clear jwt?
      const decodedToken = jwtDecode<JwtPayload>(authToken)
      if (!decodedToken) return console.log("invalidToken -- ", authToken)
      setAuthToken(authToken)
      setTimeUntilNextFetch(getFutureFetchTime(decodedToken.exp))
      return authToken
    } catch (e) {
      console.log("refreshToken error:", e)
    }
  }, [setAuthToken])

  // persist previous session on app first load
  useEffect(() => {
    fetchToken()
      .catch((e) => toast({ description: e.message, status: "error", isClosable: true }))
      .finally(() => setInitialFetchDone(true))
  }, [])

  // fetch new access tokens 1 min before they expire
  useEffect(() => {
    if (timeUntilNextFetch) {
      if (currentTimeout) clearTimeout(currentTimeout)
      const newTimeout = setTimeout(fetchToken, timeUntilNextFetch)
      setCurrentTimeout(newTimeout)
    }
    return () => currentTimeout && clearTimeout(currentTimeout)
  }, [timeUntilNextFetch])

  return initialFetchDone
}

// return the number of ms until the next refresh token should be fetched
const getFutureFetchTime = (futureExpiration?: number) => {
  if (!futureExpiration) return
  const now = getNow() / 1000 // seconds
  const oneMinBeforeExpiration = futureExpiration - now - 60
  return oneMinBeforeExpiration * 1000
}
