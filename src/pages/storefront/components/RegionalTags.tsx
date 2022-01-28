import { Box, GridItem, HStack, SimpleGrid, Tag, TagLabel, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { BusinessSettings } from "../../../generated/graphql"
import { LanguagesMap } from "../../settings/components/region/types"

export const RegionalTags = ({ settings }) => {
  const [tags, setTags] = useState<string[]>()
  const [timezone, setTimezone] = useState<string | null>()

  useEffect(() => {
    if (settings && settings?.languages) setTags(formatLanguagesForDisplay(settings.languages))
    if (settings && settings?.timezone) setTimezone(settings.timezone)
  }, [settings])

  return (
    <Box>
      <SimpleGrid columns={2}>
        {tags && tags.length > 0 && (
          <GridItem m={1}>
            <Text fontSize="small" color="#595959">
              Languages spoken
            </Text>
            <HStack mt={5} alignItems="flex-start">
              <SimpleGrid columns={2} spacing={1}>
                {tags &&
                  tags.map((tag, i) => (
                    <Tag size="sm" key={i} borderRadius="80px" variant="outline">
                      <TagLabel textColor="gray.700">{tag}</TagLabel>
                    </Tag>
                  ))}
              </SimpleGrid>
            </HStack>
          </GridItem>
        )}

        {timezone && (
          <GridItem m={1}>
            <Text fontSize="small" color="#595959">
              Time zone
            </Text>
            <HStack mt={5} align="flex-start">
              <Tag size="sm" borderRadius="80px" variant="outline">
                <TagLabel textColor="gray.700">{timezone}</TagLabel>
              </Tag>
            </HStack>
          </GridItem>
        )}
      </SimpleGrid>
    </Box>
  )
}

const formatLanguagesForDisplay = (languages) => {
  return languages.map(
    (l) => Object.keys(LanguagesMap).find((key) => LanguagesMap[key as string] === l) as any,
  )
}
