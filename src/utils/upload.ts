import axios from "axios"
import config from "../config"
import { isValidURL } from "./validators"
import * as Sentry from "@sentry/react"

const uploadFromFile = async (
  file,
  deletePath: string | null,
): Promise<{
  error: boolean
  data: string | null
}> => {
  const form = new FormData()
  form.append("image", file)
  try {
    const res = await axios({
      method: "POST",
      url: config.API_ENDPOINTS.UPLOAD,
      data: form,
      headers: { "content-type": "multipart/form-data" },
    })
    const data = res.data && res.data.path
    if (data && deletePath) deleteFromCloudinary(deletePath)
    return { error: false, data }
  } catch (e) {
    Sentry.captureException(e)
    console.error("upload -- err:", e)
    return { error: true, data: null }
  }
}

const uploadFromURL = async (
  path: string,
  deletePath: string | null,
): Promise<{
  error: boolean
  data: any
}> => {
  if (!isValidURL(path)) throw new Error("Must be valid URL")
  try {
    const res = await axios({
      method: "POST",
      url: config.API_ENDPOINTS.REMOTE,
      data: { path },
    })
    const data = res.data && res.data.path
    if (data && deletePath) deleteFromCloudinary(deletePath)
    return { error: false, data }
  } catch (e) {
    Sentry.captureException(e)
    console.error("upload -- err:", e)
    return { error: true, data: null }
  }
}

const deleteFromCloudinary = async (path: string) => {
  if (!path) throw new Error("Path is required for deletion")
  try {
    const res = await axios({
      method: "POST",
      url: config.API_ENDPOINTS.DELETE,
      data: { path },
    })

    return { error: false, data: res.data.status }
  } catch (e) {
    Sentry.captureException(e)
    console.error("upload -- delete err:", e)
    return { error: true, data: null }
  }
}
export { uploadFromFile, uploadFromURL, deleteFromCloudinary }
