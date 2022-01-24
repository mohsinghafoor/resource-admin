import { ErrorResponse } from "@apollo/client/link/error"
import * as Sentry from "@sentry/react"
import {
  captureSentryExceptionOptions,
  ErrorOperation,
  getOperationDataOptions,
  getResponseDataOptions,
} from "../types"

export const captureSentryException = ({
  includeVariables,
  includeResponse,
  includeBody,
  extras,
  title,
  error,
}: captureSentryExceptionOptions) => {
  Sentry.withScope((scope) => {
    if (error?.operation) {
      const operationData = getOperationData({
        includeVariables,
        includeBody,
        error,
      })

      scope.setExtra("operation", operationData)
    }

    if (includeResponse) {
      const responseData = getResponseData({
        error,
      })

      scope.setExtra("response", responseData)
    }

    if (extras?.length) {
      extras.forEach((extra) => {
        scope.setExtra(extra.key, extra.value)
      })
    }

    let errorTitle = "GraphQL Error"

    if (title) {
      errorTitle += `: ${title}`
    }

    Sentry.captureException(new Error(errorTitle))
  })
}

export const defaultErrorFilter = (error: ErrorResponse) => {
  if (error?.networkError) {
    return true
  }

  if (error?.graphQLErrors?.length && !error?.response?.data) {
    return true
  }

  return false
}

export const defaultOptions = {
  filter: defaultErrorFilter,
  includeVariables: true,
  includeResponse: true,
  includeBody: true,
}

export const getOperationData = ({
  includeVariables,
  includeBody,
  error,
}: getOperationDataOptions): ErrorOperation => {
  const query = error?.operation?.query

  const definition = query?.definitions?.[0]

  const operation: ErrorOperation = {
    name: error?.operation?.operationName,
    type: definition?.["operation"],
  }

  if (includeBody) {
    operation.body = query?.loc?.source?.body || ""
  }

  if (includeVariables) {
    operation.variables = JSON.stringify(error?.operation?.variables || {})
  }

  return operation
}

export const getResponseData = ({ error }: getResponseDataOptions) => {
  if (!error?.response) {
    return null
  }

  let responseData

  try {
    responseData = JSON.stringify(error?.response)
  } catch {
    responseData = error?.response
  }

  return responseData
}
