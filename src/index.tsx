import React from "react"
import { render } from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider as StyletronProvider } from "styletron-react"
import { Client as Styletron } from "styletron-engine-atomic"
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root"),
)

reportWebVitals()
