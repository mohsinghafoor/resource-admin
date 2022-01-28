import { useEffect } from "react"
import SplashPage from "../../components/SplashPage"
import { useSignout } from "../../services/auth/useSignout"

const LogoutPage = () => {
  const signout = useSignout()

  useEffect(() => {
    signout()
  }, [signout])

  return <SplashPage />
}

export default LogoutPage
