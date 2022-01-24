import { isStaging } from "./../../utils/envUtils"
import { onError } from "@apollo/client/link/error"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import { merge } from "merge"
import { config } from "../../config"
import { isProduction } from "../../utils/envUtils"
import { buildSentryErrorLinkOptions } from "./types"
import { captureSentryException, defaultOptions } from "./utils"

Sentry.init({
  dsn: config.SENTRY.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: config.APP_ENV,
  enabled: isProduction || isStaging,
})

export const buildSentryErrorLink = (options?: buildSentryErrorLinkOptions) =>
  onError((error) => {
    const linkOptions = merge(defaultOptions, options)

    const isValid = linkOptions.filter(error)

    if (!isValid) {
      return
    }

    const exceptionData = {
      includeVariables: linkOptions.includeVariables,
      includeResponse: linkOptions.includeResponse,
      includeBody: linkOptions.includeBody,
      error,
    }

    if (error?.networkError) {
      captureSentryException({
        ...exceptionData,
        title: error?.networkError?.message,
        extras: [
          {
            key: "networkError",
            value: error?.networkError,
          },
        ],
      })

      return
    }

    if (error?.graphQLErrors?.length) {
      const graphQLErrors = (error?.graphQLErrors || []).map((graphQLError) => ({
        message: graphQLError.message,
      }))

      graphQLErrors.forEach((graphQLError) => {
        captureSentryException({
          ...exceptionData,
          title: graphQLError?.message,
          extras: [
            {
              key: "graphQLError",
              value: graphQLError,
            },
          ],
        })
      })
    }
  })

export const sentryErrorLink = buildSentryErrorLink({
  includeBody: true,
  includeResponse: true,
  includeVariables: true,
})
