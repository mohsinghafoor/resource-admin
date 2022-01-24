import { useApolloClient } from "@apollo/client"
import { useCallback } from "react"
import { useHistory } from "react-router-dom"
// import { useGetMe } from "../../store/useGetMe"
import { createAnalyticsTrack } from "../analytics"
import { deleteRefreshToken } from "./useFetchRefreshToken"

export const useSignout = () => {
  const history = useHistory()
  const resetApollo = useClearApolloStore()
  const trackLogoutEvent = createAnalyticsTrack("client:user_logout")

  return useCallback(async () => {
    await resetApollo()
    await resetLocalStorage()
    await invalidateCookies()
    history.push("/")
  }, [])
}

const useClearApolloStore = () => {
  const client = useApolloClient()
  return useCallback(async () => {
    await client.clearStore()
    client.refetchQueries({ include: "all" })
  }, [])
}

const resetLocalStorage = () => {
  localStorage.setItem("encryptedPrivateKey", "")
  localStorage.setItem("token", "") // local storage not used for tokens anymore, but still clearing
}

const invalidateCookies = () => {
  deleteRefreshToken()
}
