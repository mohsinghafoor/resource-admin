import { VStack, HStack, Stack } from "@chakra-ui/layout"
import {
  Checkbox,
  MenuDivider,
  MenuGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Menu,
  MenuList,
  MenuItem,
  Text,
  Wrap,
} from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import { useState, useEffect, FormEvent } from "react"
import { TopNav } from "./TopNav"
import {
  faComment,
  faLock,
  faArrowLeft,
  faArrowRight,
  faArrowsAltH,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as valid from "yup"
import Button from "../../../../components/Button"
import { MenuButton } from "../../../../components/Menu"
import FormikField from "../../../../components/FormikField"
import { Listing } from "../../../../generated/graphql"

const validationSchema = valid.object({
  cost: valid
    .string()
    .required("Price is required")
    .test("max", "Cannot be over 9,999", (val) => Number(val) < 10000)
    .test("min", "Cannot be negative", (val) => Number(val) >= 0 || val !== undefined),
  minPrice: valid.number(),
  maxPrice: valid.number().nullable(true),
  validMaxMin: valid.boolean().when(["minPrice", "maxPrice"], {
    is: (minPrice, maxPrice) => {
      return minPrice > maxPrice
    },
    then: valid.boolean().required("min is greater than max"),
  }),
})

interface PriceFormProps {
  listing?: Listing
  currentStep: number
  next: (formData: FormValues, step: number) => void
  back: () => void
  onKeyDown: (e: FormEvent<HTMLFormElement>) => void
}

interface FormValues {
  cost?: number
  minPrice?: number
  maxPrice?: number
}

export const PriceForm = ({ listing, next, back, onKeyDown, currentStep }: PriceFormProps) => {
  const [showPriceRange, setShowPriceRange] = useState(false)
  const [isCustomPrice, setIsCustomPrice] = useState(false)
  const [isSetNoMax, setIsSetNoMax] = useState(false)
  const [withStep, setWithStep] = useState(0)
  const { minPrice, maxPrice, cost } = (listing ?? {}) as Listing
  const formik = useFormik({
    initialValues: {
      cost,
      minPrice: minPrice ?? 0,
      maxPrice: maxPrice ?? 0,
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values: FormValues) => {
      const formData = {
        cost: values.cost,
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
      }
      next(formData, withStep)
    },
  })

  useEffect(() => {
    setIsCustomPrice(cost === "0.00")
    if (minPrice > 0 || maxPrice > 0) {
      setShowPriceRange(true)
    }
    if (cost === 0) setIsCustomPrice(true)

    if (maxPrice === undefined) setIsSetNoMax(true)
  }, [cost])

  const handleCustomChange = (checked) => {
    setIsCustomPrice(checked)
    setShowPriceRange(false)
    if (checked) formik.setValues({ ...formik.values, cost: 0 })
  }

  const handleFixed = () => {
    setIsCustomPrice(false)
    setShowPriceRange(false)
    formik.setValues({ ...formik.values, minPrice: 0, maxPrice: 0 })
  }

  const setNoMax = () => {
    if (!isSetNoMax) {
      formik.setFieldValue("maxPrice", undefined)
    } else {
      formik.setFieldValue("maxPrice", 0)
    }
    setIsSetNoMax(!isSetNoMax)
  }

  return (
    <>
      <TopNav
        currentStep={currentStep}
        onClick={(step) => {
          setWithStep(step)
          formik.submitForm()
        }}
      />
      <FormikProvider value={formik}>
        <Form onKeyDown={onKeyDown}>
          <Menu>
            {({ isOpen, onClose }) => (
              <>
                <MenuButton
                  data-testid="price_form"
                  isOpen={isOpen}
                  width={240}
                  leftIcon={<FontAwesomeIcon icon={isCustomPrice ? faComment : faLock} />}
                >
                  {isCustomPrice ? "Contact for pricing" : "Fixed"}
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Pricing">
                    <MenuDivider />
                    <MenuItem
                      minH="48px"
                      justifyContent={"flex-start"}
                      onClick={() => handleFixed()}
                      onClickCapture={() => onClose()}
                    >
                      <FontAwesomeIcon icon={faLock} />
                      <Text ml={4}>Fixed</Text>
                    </MenuItem>
                    <MenuItem
                      minH="48px"
                      justifyContent={"flex-start"}
                      onClick={() => handleCustomChange(true)}
                      onClickCapture={() => onClose()}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      <Text ml={4}>Contact for pricing</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
          {isCustomPrice && (
            <Stack mt={4} mb={4}>
              <Checkbox
                isChecked={showPriceRange}
                onChange={() => {
                  setShowPriceRange(!showPriceRange)
                }}
              >
                Show price range
              </Checkbox>
            </Stack>
          )}
          {!isCustomPrice && (
            <Stack mt={6}>
              <FormikField formikKey="cost" formik={formik} title="Price">
                <NumberInput
                  data-testid="price_input"
                  name="cost"
                  value={formik.values.cost ?? 0}
                  min={0}
                  precision={2}
                  step={1}
                  onChange={(val) => formik.setFieldValue("cost", val)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormikField>
            </Stack>
          )}
          {showPriceRange && (
            <HStack align="center" justifyContent="space-between" width="100%">
              <VStack alignItems="flex-end">
                <FormikField formikKey="minPrice" formik={formik} title="Min">
                  <NumberInput
                    name="minPrice"
                    value={formik.values.minPrice ?? 0}
                    min={0}
                    precision={2}
                    step={1}
                    mb={0}
                    onChange={(val) => formik.setFieldValue("minPrice", Number(val))}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormikField>
                <Checkbox
                  style={{ marginTop: 0 }}
                  size="sm"
                  onChange={() => formik.setFieldValue("minPrice", 0)}
                >
                  no min
                </Checkbox>
              </VStack>
              <FontAwesomeIcon icon={faArrowsAltH} />
              <VStack alignItems="flex-end">
                <FormikField formikKey="validMaxMin" formik={formik} title="Max">
                  <NumberInput
                    name="maxPrice"
                    value={formik.values.maxPrice ?? 0}
                    min={0}
                    precision={2}
                    step={1}
                    mb={0}
                    isDisabled={isSetNoMax}
                    onChange={(val) => formik.setFieldValue("maxPrice", Number(val))}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormikField>
                <Checkbox isChecked={isSetNoMax} size="sm" onChange={() => setNoMax()}>
                  no max
                </Checkbox>
              </VStack>
            </HStack>
          )}
          <HStack width="100%" justifyContent="flex-end" mt={6}>
            <Button
              variant="outline"
              onClick={() => back()}
              leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              Back
            </Button>
            <Button
              data-testid="btn_add_image"
              variant="primary"
              colorScheme="primary"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              type="submit"
            >
              Add image
            </Button>
          </HStack>
        </Form>
      </FormikProvider>
    </>
  )
}
