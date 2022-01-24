/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv"
dotenv.config()

export const config = {
  NODE_ENV: process.env.NODE_ENV!,
  APP_ENV: process.env.REACT_APP_ENV!,
  SEGMENT: {
    SEGMENT_WRITE: process.env.REACT_APP_SEGMENT_WRITE!,
  },
  API_ENDPOINTS: {
    GRAPHQL: `${process.env.REACT_APP_API_URL}/graphql`,
    UPLOAD: `${process.env.REACT_APP_API_URL}/upload`,
    REMOTE: `${process.env.REACT_APP_API_URL}/upload/remote`,
    DELETE: `${process.env.REACT_APP_API_URL}/upload/delete`,
    REFRESH_TOKEN: `${process.env.REACT_APP_API_URL}/refresh-token`,
    DELETE_TOKEN: `${process.env.REACT_APP_API_URL}/delete-token`,
  },
  CUSTOMER_IO: {
    CIO_API_KEY: process.env.REACT_APP_CIO_API_KEY!,
    CIO_SITE_ID: process.env.REACT_APP_CIO_SITE_ID!,
    CIO_APP_API_KEY: process.env.REACT_APP_CIO_APP_API_KEY!,
  },
  SENTRY: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN!,
  },
  UNSPLASH: {
    ACCESS_KEY: process.env.REACT_APP_UNSPLASH_ACCESS_KEY!,
  },
  STREAM: {
    STREAM_KEY: process.env.REACT_APP_STREAM_KEY!,
  },
  KEYS: {
    KEY_STORE: `${process.env.REACT_APP_KEY_STORE_URL}/api`,
  },
  BLOCKCHAIN: {
    NETWORK: process.env.REACT_APP_BLOCKCHAIN_NETWORK!,
    RUSD_TOKEN_ADDRESS: process.env.REACT_APP_RUSD_TOKEN_ADDRESS!,
    EXPLORER: `${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}/tx`,
  },
  GUARDIAN_ENDPOINTS: {
    REGISTER: `${process.env.REACT_APP_GUARDIAN_URL}/api/register`,
    RESET: `${process.env.REACT_APP_GUARDIAN_URL}/api/reset`,
    RECOVER: `${process.env.REACT_APP_GUARDIAN_URL}/api/recover`,
    UPDATE: `${process.env.REACT_APP_GUARDIAN_URL}/api/update`,
  },
}

export default config
