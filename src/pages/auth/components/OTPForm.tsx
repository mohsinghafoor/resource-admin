import { HStack, Link, PinInput, PinInputField, Text } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction, useState } from "react"

interface LoginFormProps {
  verifyFunc: (values: { otp: string }) => void
  resendFunc: () => void
  setErrorMessage: Dispatch<SetStateAction<string>>
}

export const OTPForm = ({ verifyFunc, resendFunc, setErrorMessage }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")

  const handleChange = (value: any) => {
    setErrorMessage("")
    setOtp(value)
  }

  const handleComplete = async (value: any) => {
    setIsLoading(!isLoading)
    verifyFunc({ otp: value })
    setIsLoading(!isLoading)
  }

  const handleResend = async () => {
    setIsLoading(!isLoading)
    resendFunc()
    setIsLoading(!isLoading)
  }

  return (
    <>
      <HStack m="2rem 0rem" alignSelf="center">
        <PinInput otp={true} value={otp} onComplete={handleComplete} onChange={handleChange}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Text>
        Didn't get an email?{" "}
        <Link onClick={handleResend} color="alternate.main">
          Resend Code
        </Link>
      </Text>
    </>
  )
}
