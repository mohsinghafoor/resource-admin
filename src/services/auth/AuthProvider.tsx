import { createContext, ReactNode, useContext } from "react"
import { UserCreateInput } from "../../generated/graphql"
// import { useGetMe } from "../../store/useGetMe"
import authHooks from "./"
import { getAuthToken } from "./authToken"
import { useFetchRefreshTokenIfNecessary } from "./useFetchRefreshToken"

interface IAuthData {
  authToken: string
  isSignedIn: boolean
  hasFetchedToken: boolean
  signup: (inputArgs: UserCreateInput) => Promise<void>
  signin: (email: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

const authContext = createContext({} as IAuthData)

export const useAuth = () => {
  return useContext(authContext)
}

export const AuthProvider = ({ ...props }: { children: ReactNode }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

function useProvideAuth(): IAuthData {
  const authToken = getAuthToken()
  // const { refetchMe } = useGetMe()
  const isSignedIn = Boolean(authToken)

  // useEffect(() => {
  //   if (isSignedIn) refetchMe()
  // }, [isSignedIn, refetchMe])

  const hasFetchedToken = useFetchRefreshTokenIfNecessary()

  return {
    authToken,
    isSignedIn,
    hasFetchedToken,
    signout: authHooks.useSignout(),
    signin: authHooks.useSignin(),
    signup: authHooks.useSignup(),
  }
}
