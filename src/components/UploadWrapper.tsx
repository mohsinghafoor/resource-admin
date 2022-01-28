import {
  Box,
  BoxProps,
  Center,
  HStack,
  ImageProps,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react"
import placeholder1 from "../assets/images/placeholder-3.jpg"
import CloudinaryImage from "../components/CloudinaryImage"
import { uploadFromFile, uploadFromURL } from "../utils/upload"
import Button from "./Button"
import { ImageSearch } from "./ImageSearch"

const imgExtensions = [".jpg", ".jpeg", ".png"]

const maxFileSize = 5242880

const ERROR = {
  NOT_SUPPORTED_EXTENSION: "NOT_SUPPORTED_EXTENSION",
  FILESIZE_TOO_LARGE: "FILESIZE_TOO_LARGE",
}

const defaultStyles: BoxProps = {
  borderRadius: "2xl",
  overflow: "hidden",
  minH: "100px",
  w: "full",
  h: "full",
}

const fileInputProps: InputProps = {
  accept: "image/*",
  display: "none",
  type: "file",
}

export interface UploadCallbackProps {
  error?: boolean
  data: { url: string; file?: Blob }
}

interface UploadProps extends BoxProps {
  ref?: Ref<HTMLInputElement>
  onFileAdded?: (props: UploadCallbackProps) => void
  onUploadFinished?: (props: UploadCallbackProps) => void
  children: React.ReactElement<ImageProps>
  showSaveButton?: boolean
  withUnsplash?: boolean
  minHeight?: string
  isListing?: boolean
}

export interface UploadHandle {
  handleSave: () => Promise<UploadCallbackProps>
}

export const ImageUploadWrapper = (props: UploadProps, ref: Ref<UploadHandle>) => {
  const {
    onFileAdded,
    onUploadFinished,
    children,
    showSaveButton = false,
    withUnsplash = true,
    minHeight = "100",
    isListing = false,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<Blob | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [newSrc, setNewSrc] = useState(children?.props.src)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return setFile(null)
    const errors = getErrors(file)
    setErrors(errors)
    let data = { url: "" }
    if (!errors.length) {
      setLoading(true)
      data = await readFile(file)
      setLoading(false)
      setHasUnsavedChanges(true)
      setNewSrc(data.url)
      setFile(file)
    }
    onFileAdded?.({ error: !!errors.length, data })
  }

  const handleSave = async (): Promise<UploadCallbackProps> => {
    if (!file && !newSrc) return { error: false, data: { url: "" } }
    setLoading(true)
    const oldSrc = children && (children.props.src as string)
    setLoading(true)
    const { error, data } = file
      ? await uploadFromFile(file, oldSrc || null)
      : await uploadFromURL(newSrc || "", oldSrc || null)
    setLoading(false)
    onUploadFinished?.({ error, data: { url: data } })
    setHasUnsavedChanges(false)
    setLoading(false)
    return { error, data: { url: data } }
  }

  useImperativeHandle(ref, () => ({ handleSave })) // allows parent function to save on form submit

  const handleCancel = () => {
    const originalSrc = children.props.src ?? ""
    onFileAdded?.({ data: { url: originalSrc } })
    setHasUnsavedChanges(false)
    setNewSrc(originalSrc)
  }

  const handleOnUpslashImageSelected = (url: string) => {
    setNewSrc(url)
    setFile(null)
    onFileAdded?.({ data: { url, file: undefined } })
    setHasUnsavedChanges(true)
  }

  return (
    <>
      {isListing ? (
        <>
          <Box {...defaultStyles} {...rest} position={"relative"}>
            <Input ref={inputRef} onChange={handleFileChange} {...fileInputProps} />
            {newSrc ? (
              React.cloneElement(children, { src: newSrc })
            ) : (
              <EmptyUploader minHeight={minHeight} isListing={isListing} />
            )}
            <Box
              position={"absolute"}
              display={"flex"}
              bottom={0}
              p={3}
              alignItems={"center"}
              background={"rgba(0, 0, 0, 0.4)"}
              width={"100%"}
            >
              <Button
                leftIcon={<FontAwesomeIcon icon={faUpload} />}
                variant="primary"
                colorScheme="blue"
                mr={4}
                onClick={() => inputRef?.current?.click()}
              >
                Upload image
              </Button>
              {withUnsplash && (
                <Box>
                  <ImageSearch
                    onImageSelected={handleOnUpslashImageSelected}
                    withModal={true}
                    title={children.props.title as string}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <HStack w="full">
            <Errors errors={errors} />
            <HStack display={hasUnsavedChanges ? "inherit" : "none"} ml="auto" my={2}>
              <Button
                isLoading={loading}
                variant="outline"
                colorScheme="gray"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                display={showSaveButton ? "inherit" : "none"}
                isDisabled={loading}
                isLoading={loading}
                colorScheme="blue"
                onClick={handleSave}
              >
                Save
              </Button>
            </HStack>
          </HStack>
        </>
      ) : (
        <>
          <Box {...defaultStyles} {...rest} onClick={() => inputRef?.current?.click()}>
            <Input ref={inputRef} onChange={handleFileChange} {...fileInputProps} />
            {newSrc ? (
              React.cloneElement(children, { src: newSrc })
            ) : (
              <EmptyUploader isListing={isListing} minHeight={minHeight} />
            )}
          </Box>
          <HStack w="full">
            <Errors errors={errors} />
            <HStack display={hasUnsavedChanges ? "inherit" : "none"} ml="auto" my={2}>
              <Button
                isLoading={loading}
                variant="outline"
                colorScheme="gray"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                display={showSaveButton ? "inherit" : "none"}
                isDisabled={loading}
                isLoading={loading}
                colorScheme="blue"
                onClick={handleSave}
              >
                Save
              </Button>
            </HStack>
          </HStack>
          {withUnsplash && (
            <Box width="100%" mt={4} mb={4}>
              <ImageSearch
                onImageSelected={handleOnUpslashImageSelected}
                withModal={true}
                title={children.props.title as string}
              />
            </Box>
          )}
        </>
      )}
    </>
  )
}

const EmptyUploader = ({ minHeight, isListing }) => (
  <Center
    borderRadius="2xl"
    backgroundImage={placeholder1}
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    h={isListing ? "initial" : "100px"}
    w="full"
  >
    {isListing ? (
      <Box>
        <CloudinaryImage
          quality="low"
          rounded={"md"}
          alt={"Listing image"}
          src={""}
          minH={minHeight ?? "100px"}
        />
      </Box>
    ) : (
      <Button
        leftIcon={<FontAwesomeIcon icon={faUpload} />}
        variant="outline"
        color="white"
        borderColor="white"
      >
        Upload image
      </Button>
    )}
  </Center>
)

const Errors = (props: { errors: string[] }) => (
  <>
    {props.errors.map((err: string, idx: number) => {
      return (
        <Text color="alert.red" key={idx}>
          *{" "}
          {err === ERROR.FILESIZE_TOO_LARGE ? "File size is too big" : "Unsupported file extension"}
        </Text>
      )
    })}
  </>
)

// helpers

const getErrors = (file: File): string[] => {
  const errors: string[] = []
  if (file.size > maxFileSize) errors.push(ERROR.FILESIZE_TOO_LARGE)
  if (!hasExtension(file.name)) errors.push(ERROR.NOT_SUPPORTED_EXTENSION)
  return errors
}

const hasExtension = (fileName: string) => {
  const pattern = "(" + imgExtensions.join("|").replace(/\./g, "\\.") + ")$"
  return new RegExp(pattern, "i").test(fileName)
}

const readFile = (image: File): Promise<{ image: File; url: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    // Read the image via FileReader API and save image result in state.
    reader.onload = function (e: ProgressEvent<FileReader>) {
      // Add the file name to the data URL
      const result = e?.target?.result
      if (!result) return resolve({ image, url: "" })
      const url = (result as string).replace(";base64", `;name=${image.name};base64`)
      resolve({ image, url })
    }

    reader.readAsDataURL(image)
  })
}

export default forwardRef(ImageUploadWrapper)
