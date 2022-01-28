import { useLocation } from "react-router-dom"

export const headerHeight = "52px"
export const footerHeight = "52px"

export const useIsOnboarding = () => {
  const location = useLocation()
  const path = location.pathname.replace("/", "")
  return path === "onboarding"
}
