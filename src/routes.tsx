import { useEffect } from "react"
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { useSearchParam } from "react-use"
import { useAnalytics } from "use-analytics"
import { LoginPage } from "./pages/auth/LoginPage"
import { RequestResetPassword } from "./pages/auth/RequestResetPassword"
import { RegisterPage } from "./pages/auth/RegisterPage"
import Admin from "./pages/auth/components/Admin"
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
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/request-reset-password" component={RequestResetPassword} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/admin" component={Admin} />
      {/*<Route path="/marketplace/listings" component={EditlistModal} /> */}
      <Route path="/list/edit" component={Admin} />
      <Route path="/marketplace/listings" component={Admin} />
    </Switch>
  )
}

export default Routes
