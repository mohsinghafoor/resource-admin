let authToken = ""

export const getAuthToken = () => authToken

export const setAuthToken = (value: string) => (authToken = value)
