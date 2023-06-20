import React, { memo } from "react";
import {
  Box,
  Divider,
  VStack,
  Image,
  Center,
  Text,
  HStack,
  Badge,
  useColorMode,
} from "native-base";
import categoryColors from "../../utils/GameCategoriesColor.constant";
import { CategoryEnum } from "../../enums/Games/GamesParameters.enum";
import { IGame } from "../../interfaces/Game/IGameList.interface";

function GameCard({
  genre,
  platform,
  short_description,
  thumbnail,
  title,
}: IGame.IGameCardProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const { light, dark } =
    categoryColors[genre.toLocaleLowerCase() as CategoryEnum];

  return (
    <VStack mb={3}>
      <Badge
        maxWidth={"125px"}
        variant="outline"
        borderTopRadius={"xl"}
        borderBottomWidth={0}
        borderWidth={2}
        _light={{
          borderColor: light?.borderColor,
          color: light?.textColor,
          bg: light?.bgColor,
        }}
        _dark={{
          borderColor: dark?.borderColor,
          color: dark?.textColor,
          bg: dark?.bgColor,
        }}
      >
        <Text color={isDarkMode ? dark?.textColor : light?.textColor}>
          {genre}
        </Text>
      </Badge>
      <Box
        _dark={{ bg: "blueGray.600", borderColor: dark?.borderColor }}
        _light={{ bg: "blueGray.200", borderColor: light?.borderColor }}
        borderWidth={2}
        borderRadius="xl"
        borderTopRadius={0}
        maxWidth="320px"
        position="relative"
      >
        <VStack
          space="4"
          divider={
            <Divider
              _light={{
                bg: light.borderColor,
              }}
              _dark={{
                bg: dark.borderColor,
              }}
            />
          }
        >
          <Center>
            <Text fontWeight="bold" pt={4}>
              {title}
            </Text>
          </Center>

          <HStack alignItems="center" p={2} space={1}>
            <Badge
              position="absolute"
              right={"2%"}
              top={"-14px"}
              colorScheme="rose"
              variant="outline"
            >
              {platform}
            </Badge>
            <Image
              borderRadius="lg"
              source={{ uri: thumbnail }}
              alt="Alternate Text"
              size="xl"
            />
            <Box flexShrink={1}>
              <Text overflow="hidden" px="4" numberOfLines={4}>
                {short_description}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}

export default memo(GameCard);
