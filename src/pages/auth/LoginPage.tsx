import { Box, Flex, Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import PageTitle from "../../components/PageTitle"
import { useAuth } from "../../services/auth/AuthProvider"
import { LoginForm } from "./components/LoginForm"

export const LoginPage = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.isSignedIn) auth.signout()
  }, [auth])

  return (
    <Flex height="full" justify="center" bgColor="primary.softTransparent">
      <Stack w={{ base: "full", sm: "450px" }} spacing={8} py={12} px={6} mb={10}>
        <Stack align={"center"}>
          <PageTitle textAlign="center">Sign in to your account</PageTitle>
        </Stack>
        <Box rounded={"2xl"} boxShadow={"lg"} bg="white" p={8}>
          <Stack spacing={4}>
            <LoginForm />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
