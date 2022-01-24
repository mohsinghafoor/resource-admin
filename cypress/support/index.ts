import { LoginViaRefreshTokenProps } from "./commands/auth"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUI(): void
      loginViaRefreshToken(props?: LoginViaRefreshTokenProps): void
      seedTestDb(): void
      getBySel(selector: string, ...options: any): Chainable<JQuery<HTMLElement>>
    }
  }
}

import "./commands"
import "cypress-file-upload"
