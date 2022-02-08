import { ErrorBoundary } from "@sentry/react"
import { BrowserRouter as Router } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { AnalyticsProvider } from "use-analytics"
import Routes from "./routes"
import { analytics } from "./services/analytics"
import ApolloProvider from "./services/apollo/ApolloProvider"
import SomethingWentWrongPage from "./services/errors/SomethingWentWrongPage"
import { ThemeProvider } from "./theme"
import { AuthProvider } from "./services/auth/AuthProvider"
import "./theme/App.scss"
import { Header } from "./navigation"
require("./utils/icons")
import { Provider as StyletronProvider } from "styletron-react"
import { Client as Styletron } from "styletron-engine-atomic"
const engine = new Styletron()
const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<SomethingWentWrongPage />}>
        <RecoilRoot>
          <ApolloProvider>
            <StyletronProvider value={engine}>
              <AnalyticsProvider instance={analytics}>
                <Router>
                  <AuthProvider>
                    <Header />
                    <Routes />
                  </AuthProvider>
                </Router>
              </AnalyticsProvider>
            </StyletronProvider>
          </ApolloProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
