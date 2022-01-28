import { useParams } from "react-router-dom"
export const useIsOwnBusiness = () => {
  const { handle: urlHandle } = useParams<{ handle: string }>()
  return <></>
}
