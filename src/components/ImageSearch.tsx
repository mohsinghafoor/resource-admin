import React, { useCallback, useEffect, useState } from "react"
import {
  SimpleGrid,
  Box,
  Image,
  Input,
  Link,
  Text,
  LinkBox,
  Modal,
  ModalOverlay,
  ModalContent,
  Wrap,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  HStack,
  Center,
  ModalFooter,
  Flex,
  Avatar,
  Spinner,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight, faArrowCircleLeft, faSearch } from "@fortawesome/free-solid-svg-icons"
import { createApi } from "unsplash-js"
import { config } from "../config"
import * as Sentry from "@sentry/react"
import Button from "./Button"
import { LoadingEllipses } from "./CenteredSpinner"

type Photo = {
  id: number
  width: number
  height: number
  urls: { large: string; regular: string; raw: string; small: string }
  color: string | null
  user: {
    username: string
    name: string
  }
}

// TODO put in config
const api = createApi({
  accessKey: config.UNSPLASH.ACCESS_KEY,
})

const PhotoComp: React.FC<{ photo: Photo; selectImage?: any }> = ({ photo, selectImage }) => {
  const { user, urls } = photo

  return (
    <LinkBox as="article" onClick={() => selectImage(photo)}>
      <Image
        minH="200px"
        minW="200px"
        boxSize="200px"
        objectFit="cover"
        src={urls.regular}
        _hover={{
          cursor: "pointer",
          boxShadow: "0 -2px 4px 0px rgb(0 0 0 / 63%), 0 2px 6px 1px rgb(0 0 0 / 68%)",
        }}
        fallback={<LoadingEllipses minH="200px" />}
      />
      <Text mt={2}>
        <Link target="_blank" href={`https://unsplash.com/@${user.username}`} rel="noreferrer">
          {user.name}
        </Link>
      </Text>
    </LinkBox>
  )
}

const Inline: React.FC<{ items: number }> = ({ items }) => {
  return (
    <SimpleGrid columns={items} spacing={10}>
      {/* {results.map((photo) => (
                <Box key={photo.id} maxW="sm" borderRadius="lg" boxSize="100px" objectFit="cover">
                    <PhotoComp photo={photo} />
                </Box>
            ))} */}
    </SimpleGrid>
  )
}

const WithModal: React.FC<{ items: number; isOpen; onClose; type; title; onImageSelected }> = ({
  items,
  isOpen,
  onClose,
  type,
  title,
  onImageSelected,
}) => {
  const [data, setPhotosResponse] = useState<any>(null)
  const [query, setQuery] = useState<string>(title)
  const [page, setPage] = useState<number>(1)
  const [image, setImage] = useState<any>(null)

  const updateQuery = (e) => {
    const value = e.target.value
    setQuery(value)
  }

  const selectImage = async (image) => {
    if (image && image.urls.full) {
      setImage(image.urls.full)
      onImageSelected(image.urls.full)
      api.photos.trackDownload({ downloadLocation: image.links.download_location })
      onClose()
    }
  }

  const fetchImages = useCallback(
    (q) => {
      api.search
        .getPhotos({ query: q, orientation: "landscape", page: page, perPage: 10 })
        .then((result) => {
          setPhotosResponse(result)
        })
        .catch((e) => {
          Sentry.captureException(e)
          console.log("ERROR: ", e)
        })
    },
    [page],
  )

  const next = () => {
    setPage(page + 1)
  }
  const prev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    fetchImages(query)
  }, [fetchImages, page, query])

  if (data === null) {
    return <Spinner />
  } else if (data.errors) {
    Sentry.captureException(data.errors[0])
    return (
      <div>
        <div>{data.errors[0]}</div>
      </div>
    )
  } else {
    const results = data.response.results
    const total = data.response.total
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent p={"2em"} overflow="hidden" maxWidth={"65em"} m={"3em"} minHeight="auto">
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={6}>
              <Input value={query} onChange={updateQuery} />
              <Button variant="primary" colorScheme="blue" onClick={() => fetchImages(query)}>
                Search
              </Button>
            </HStack>
            {image && type === "cover" && (
              <Box maxW={"100%"} mb="5">
                <Image h={"220px"} w={"full"} src={image} objectFit={"cover"} />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>
              </Box>
            )}
            <Wrap columns={items} spacing={10}>
              {results.map((photo) => (
                <Box key={photo.id}>
                  <PhotoComp photo={photo} selectImage={selectImage} />
                </Box>
              ))}
              {!!results.length && total > 10 && (
                <Flex align="center">
                  {page > 1 && (
                    <Box _hover={{ cursor: "pointer", color: "#636363" }} onClick={prev} mr={4}>
                      <FontAwesomeIcon size="2x" icon={faArrowCircleLeft} />
                    </Box>
                  )}
                  <Box _hover={{ cursor: "pointer", color: "#636363" }} onClick={next}>
                    <FontAwesomeIcon size="2x" icon={faArrowCircleRight} />
                  </Box>
                </Flex>
              )}
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <Center>
              <Text>
                Photos by{" "}
                <Link color="teal.500" href="https://unsplash.com/" target="_blank">
                  Unsplash
                </Link>
              </Text>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
}

export interface ImageSearchProps {
  withModal: boolean
  title: string
  items?: number
  type?: string
  onImageSelected?: (url: string) => void
}

export const ImageSearch = ({
  withModal = true,
  title = "",
  items = 4,
  type = "listing",
  onImageSelected,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return withModal ? (
    <>
      <Button
        leftIcon={<FontAwesomeIcon icon={faSearch} />}
        bg="#699DFF"
        float="right"
        color="white"
        onClick={onOpen}
        borderRadius="16px"
        fontSize="14px"
        fontWeight="700"
        h="37px"
      >
        Search image
      </Button>
      {isOpen && (
        <WithModal
          onImageSelected={onImageSelected}
          isOpen={isOpen}
          onClose={onClose}
          items={items}
          type={type}
          title={title}
        />
      )}
    </>
  ) : (
    <Inline items={items} />
  )
}
