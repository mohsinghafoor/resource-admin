import { useEffect } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { useSearchParam } from "react-use"
import { useAnalytics } from "use-analytics"
import { LoginPage } from "./pages/auth/LoginPage"
import { RequestResetPassword } from "./pages/auth/RequestResetPassword"
import { RegisterPage } from "./pages/auth/RegisterPage"
import Admin from "./pages/auth/components/Admin"
import CatalogCover from "./pages/marketplace/components/catalog/CatalogCover"
import FourWideList from "./pages/marketplace/components/catalog/FourWideList"
import ThreeWideList from "./pages/marketplace/components/catalog/ThreeWideList"

const Routes = () => {
  const { page } = useAnalytics()
  const location = useLocation()
  const inviteCode = useSearchParam("code")

  useEffect(() => {
    if (inviteCode) localStorage.setItem("inviteCode", inviteCode)
  }, [inviteCode])

  useEffect(() => {
    page()
  }, [location, page])

  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/request-reset-password" component={RequestResetPassword} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/admin" component={Admin} />
    </Switch>
  )
}

export default Routes
