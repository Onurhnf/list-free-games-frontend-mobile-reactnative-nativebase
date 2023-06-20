import {
  Box,
  FlatList,
  Spinner,
  VStack,
  View,
  Button,
  Icon,
} from "native-base";
import React, { memo, useEffect, useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import GameService from "../../services/Game.service";
import GameCard from "../../components/Games/GameCard.component";
import { IGame } from "../../interfaces/Game/IGameList.interface";
import { CategoryEnum } from "../../enums/Games/GamesParameters.enum";

export default function Home({ navigation }: any) {
  const [loadedGames, setLoadedGames] = useState<IGame.IGameDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const gamesPerBatch = 20;
  const [batchIndex, setBatchIndex] = useState(0);
  const [allGames, setAllGames] = useState<IGame.IGameDetail[]>([]);
  const flatListRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  async function handleGetGames() {
    try {
      const result = await GameService.GetAllGameList();

      const filteredGames = result.data.filter((game) =>
        Object.values(CategoryEnum).includes(
          game.genre.toLowerCase() as CategoryEnum
        )
      );

      setAllGames(filteredGames.slice(0, 42));
      loadNextBatch(filteredGames.slice(0, 42));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetGames();
  }, []);

  const loadNextBatch = (games: IGame.IGameDetail[]) => {
    const startIndex = batchIndex * gamesPerBatch;
    const endIndex = (batchIndex + 1) * gamesPerBatch;
    const nextBatch = games.slice(startIndex, endIndex);
    setLoadedGames((prevGames) => [...prevGames, ...nextBatch]);
    setBatchIndex(batchIndex + 1);
  };

  const renderItem = ({ item }: { item: IGame.IGameDetail }) => (
    <GameCard
      title={item.title}
      thumbnail={item.thumbnail}
      short_description={item.short_description}
      genre={item.genre}
      platform={item.platform}
    />
  );

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <View _light={{ bg: "blueGray.100" }} _dark={{ bg: "coolGray.700" }}>
      <VStack mb={8} mt={8} alignItems="center">
        {isLoading ? (
          <Spinner size="lg" color="blue.500" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={loadedGames}
            renderItem={renderItem}
            keyExtractor={(game) => game.id.toString()}
            onEndReached={() => loadNextBatch(allGames)}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
              loadedGames.length < allGames.length ? (
                <Spinner size="lg" color="blue.500" />
              ) : null
            }
            onScroll={handleScroll}
          />
        )}

        {isScrolled && (
          <Button
            position="absolute"
            bottom={4}
            right={4}
            onPress={scrollToTop}
            borderRadius="3xl"
            variant="solid"
            colorScheme="blue"
            _text={{ color: "white" }}
            startIcon={
              <Icon as={FontAwesome} name="chevron-up" size={4} color="white" />
            }
          />
        )}
      </VStack>
    </View>
  );
}
