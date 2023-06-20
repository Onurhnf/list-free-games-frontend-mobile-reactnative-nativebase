import { FlatList, Spinner, VStack, View, Button, Icon } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import GameService from "../../services/Game.service";
import GameCard from "../../components/Game/GameCard.component";
import { IGame } from "../../interfaces/Game/IGameList.interface";
import { CategoryEnum } from "../../enums/Games/GamesParameters.enum";
import { Animated, Easing } from "react-native";
import SortFilterHeader from "../../components/Header/SortFilterHeader.component";
import SortingGamesModal from "../../components/Modal/SortingGamesModal.component";
import FilteringGamesModal from "../../components/Modal/FilteringGamesModal.component";
import Helpers from "../../utils/Helpers";

export default function Home() {
  const [loadedGames, setLoadedGames] = useState<IGame.IGameDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batchIndex, setBatchIndex] = useState(0);
  const [allGames, setAllGames] = useState<IGame.IGameDetail[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    platform: "",
    category: "",
  });

  const flatListRef = useRef<any>(null);
  const headerHeight = useRef(new Animated.Value(60)).current;
  const prevOffsetY = useRef(0);
  const gamesPerBatch = 20;

  // Fetch Data Logic Start
  async function handleGetGames(params: string) {
    try {
      const result = await GameService.GetAllGameList(params);
      console.log(params);

      const filteredGames = result.data.filter((game) =>
        Object.values(CategoryEnum).includes(
          game.genre.toLowerCase() as CategoryEnum
        )
      );

      setAllGames(filteredGames);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setShowSortModal(false);
    setBatchIndex(0);
    setLoadedGames([]);
    setAllGames([]);
    const params = Helpers.generateAPIURLParams(
      filter.platform,
      filter.category,
      sort
    );
    handleGetGames(params);
  }, [sort, filter]);
  // Fetch Data Logic End

  // Handling Lazy Loading
  const loadNextBatch = (games: IGame.IGameDetail[]) => {
    const startIndex = batchIndex * gamesPerBatch;
    const endIndex = (batchIndex + 1) * gamesPerBatch;
    const nextBatch = games.slice(startIndex, endIndex);
    setLoadedGames((prevGames) => [...prevGames, ...nextBatch]);

    // Check if all games have been loaded
    if (endIndex >= allGames.length) {
      setBatchIndex(-1); // Set batchIndex to -1 to indicate that all games are loaded
    } else {
      setBatchIndex(batchIndex + 1);
    }
  };

  // Scroll Logic Start
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);

    // Update header height
    Animated.timing(headerHeight, {
      toValue: offsetY < 500 || offsetY < prevOffsetY.current ? 60 : 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Update prevOffsetY to show or hide buttons
    if (prevOffsetY.current + 100 < offsetY) {
      prevOffsetY.current = offsetY + 1;
    } else if (offsetY < prevOffsetY.current + 10) {
      prevOffsetY.current = offsetY;
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };
  // Scroll Logic End

  const renderItem = ({ item }: { item: IGame.IGameDetail }) => (
    <GameCard
      title={item.title}
      thumbnail={item.thumbnail}
      short_description={item.short_description}
      genre={item.genre}
      platform={item.platform}
    />
  );

  return (
    <View
      _light={{ bg: "blueGray.100" }}
      _dark={{ bg: "coolGray.700" }}
      position="relative"
      flex={1}
    >
      {/** Modals */}
      <SortingGamesModal
        setShowSortModal={setShowSortModal}
        showSortModal={showSortModal}
        setSort={setSort}
        sort={sort}
      />
      <FilteringGamesModal
        setShowFilterModal={setShowFilterModal}
        showFilterModal={showFilterModal}
        setFilter={setFilter}
      />
      <VStack mb={8} alignItems="center">
        {/** Show Sort and Filter Buttons*/}
        <Animated.View
          style={{
            height: headerHeight,
            width: "100%",
            zIndex: 1,
            overflow: "hidden",
            justifyContent: "space-between",
          }}
        >
          <SortFilterHeader
            setShowSortModal={setShowSortModal}
            setShowFilterModal={setShowFilterModal}
          />
        </Animated.View>
        {/** Show Game Card or Spinner */}
        {isLoading ? (
          <Spinner size="lg" color="blue.500" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={loadedGames}
            renderItem={renderItem}
            keyExtractor={(game) => game.id.toString()}
            onEndReached={() => {
              if (batchIndex !== -1) {
                loadNextBatch(allGames);
              }
            }}
            onEndReachedThreshold={0.8}
            ListFooterComponent={
              //when reached to bottom show spinner till all listed
              loadedGames.length < allGames.length ? (
                <Spinner size="lg" color="blue.500" />
              ) : null
            }
            onScroll={handleScroll}
          />
        )}
      </VStack>
      {/** Show Move Top Button */}
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
    </View>
  );
}
