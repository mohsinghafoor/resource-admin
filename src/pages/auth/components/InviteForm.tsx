import { Box, Button, Center, Checkbox, Input, useDisclosure } from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import React, { useCallback, useState } from "react"
import * as valid from "yup"
import FormikField from "../../../components/FormikField"
import { TOSModal } from "./TOSModal"

interface InviteFormProps {
  acceptInviteFunc: (values: { password: string }) => void
  isLoading: boolean
}

const validation = valid.object({
  password: valid.string().min(8, "Minimum 8 characters").required("Password is required"),
})

export const InviteForm = ({ acceptInviteFunc, isLoading }: InviteFormProps) => {
  const [acceptTOS, setAcceptTOS] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAcceptTOS = () => {
    setAcceptTOS(true)
    onClose()
  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values: { password: string }) => {
      await acceptInviteFunc({ password: values.password })
    },
    validationSchema: validation,
  })

  const maySignIn = useCallback(() => {
    const { password } = formik.values
    return !!(password && acceptTOS)
  }, [acceptTOS, formik.values])

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <FormikField formikKey="password" formik={formik} title="New password">
            <Input type="password" placeholder="Password" />
          </FormikField>
          <Box display={"flex"} alignSelf={"flex-start"}>
            <Checkbox
              isChecked={acceptTOS}
              onChange={(e) => {
                if (!acceptTOS) {
                  onOpen()
                  return
                }
                setAcceptTOS(false)
              }}
            >
              Accept Terms of Service
            </Checkbox>
          </Box>
          <Center w="full" mt={4}>
            <Button
              isLoading={isLoading}
              isDisabled={!maySignIn() || isLoading}
              type="submit"
              colorScheme="primary"
            >
              Accept Invite
            </Button>
          </Center>
        </Form>
      </FormikProvider>
      <TOSModal handleAcceptTOS={handleAcceptTOS} onClose={onClose} isOpen={isOpen} />
    </>
  )
}
