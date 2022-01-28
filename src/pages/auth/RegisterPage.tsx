import { Box, Flex, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import PageTitle from "../../components/PageTitle"
import { useAuth } from "../../services/auth/AuthProvider"
import { RegisterForm } from "./components/RegisterForm"

export const RegisterPage = () => {
  const auth = useAuth()
  const [isSurrogate] = useState(handleIsSurrogate())
  const campaign = new URL(window.location.href).searchParams.get("c")

  useEffect(() => {
    if (auth.isSignedIn) auth.signout()
  }, [auth])

  return (
    <Flex h="full" justify="center" bgColor="primary.softTransparent">
      <Stack w={{ base: "full", sm: "450px" }} spacing={8} py={12} px={6} mb={10}>
        <Stack align={"center"}>
          <PageTitle textAlign="center">Create your account</PageTitle>
        </Stack>
        <Box w="full" rounded={"2xl"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <RegisterForm
              registerFunc={async (formValues) => {
                await auth.signup({
                  ...formValues,
                  campaign,
                  sendOTPEmail: !isSurrogate,
                })
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

const handleIsSurrogate = () => {
  const isSurrogate = window.location.href.includes("surrogate")
  window.localStorage.setItem("isOnboardingViaSurrogate", isSurrogate.toString())
  return isSurrogate
}
