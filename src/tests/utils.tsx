import { MockedProvider } from "@apollo/client/testing"
import { render } from "@testing-library/react"
import React, { ReactElement } from "react"
import { RecoilRoot } from "recoil"

export const renderWithContext = (component: ReactElement) => {
  return render(
    <MockedProvider>
      <RecoilRoot>{component}</RecoilRoot>
    </MockedProvider>,
  )
}

export const renderWithRecoil = (comp: ReactElement) => {
  return render(<RecoilRoot>{comp}</RecoilRoot>)
}
