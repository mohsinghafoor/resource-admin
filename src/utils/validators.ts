import * as isEmail from "isemail"

/* eslint-disable no-useless-escape */
export const urlRegEx = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/
export const alphaNumericRegEx = /^[a-zA-Z0-9_\_\-]*$/

export const isValidURL = (url: string) => {
  const pattern = new RegExp(urlRegEx, "i") // fragment locator
  return !!pattern.test(url)
}

export const validatePassword = (ctx: string, str: string) => {
  try {
    if (typeof str !== "string") {
      throw TypeError(`${ctx} must be a string`)
    }

    validateLength(ctx, str, 8, 30)

    if (!/[a-zA-Z]+/.test(str)) {
      throw TypeError(`${ctx} must contain english letters`)
    }

    if (!/\d+/.test(str)) {
      throw TypeError(`${ctx} must contain numbers`)
    }

    if (!/[^\da-zA-Z]+/.test(str)) {
      throw TypeError(`${ctx} must contain special charachters`)
    }
    return true
  } catch (e) {
    return false
  }
}

export const validateLength = (ctx: string, str: string, ...args: number[]) => {
  let min, max

  if (args.length === 1) {
    min = 0
    max = args[0]
  } else {
    min = args[0]
    max = args[1]
  }

  if (typeof str !== "string") {
    throw TypeError(`${ctx} must be a string`)
  }

  if (str.length < min) {
    throw TypeError(`${ctx} must be at least ${min} chars long`)
  }

  if (str.length > max) {
    throw TypeError(`${ctx} must contain ${max} chars at most`)
  }
}

export const isValidEmail = (str: string) => {
  return isEmail.validate(str)
}

export const openLinkInNewTab = (link: string) => {
  window.open(link, "_blank")
}
