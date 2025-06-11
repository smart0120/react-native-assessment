import GameCard from "@/components/game/GameCard";
import Tab from "@/components/game/Tab";
import Typography from "@/components/ui/Typography";
import { AppThemeContext } from "@/context/AppThemeProvider";
import { useGames } from "@/hooks/useGames";
import { Game } from "@/models/game";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dashboard() {
  const { top, bottom } = useSafeAreaInsets();
  const { games, loading, error } = useGames();
  const { appliedTheme } = useContext(AppThemeContext);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("all");

  const brandImages = useMemo(
    () => [
      require("@/assets/images/brands/brand-1.png"),
      require("@/assets/images/brands/brand-2.png"),
      require("@/assets/images/brands/brand-3.png"),
      require("@/assets/images/brands/brand-4.png"),
      require("@/assets/images/brands/brand-5.png"),
      require("@/assets/images/brands/brand-6.png"),
      require("@/assets/images/brands/brand-7.png"),
      require("@/assets/images/brands/brand-8.png"),
      require("@/assets/images/brands/brand-9.png"),
      require("@/assets/images/brands/brand-10.png"),
    ],
    []
  );

  const filteredGames = useMemo(
    () =>
      selectedOption === "all"
        ? games
        : games.filter((g) => g.status === selectedOption),
    [games, selectedOption]
  );

  const renderGameCard = useCallback(
    ({ item, index }: { item: Game; index: number }) => (
      <GameCard game={item} index={index} brandImages={brandImages} />
    ),
    [brandImages]
  );

  if (loading || error || games.length === 0) {
    const message = loading
      ? ""
      : error
      ? "Oops, failed to load games."
      : "No games available.";
    return (
      <View className="flex-1 justify-center items-center bg-primary p-4">
        {loading ? (
          <ActivityIndicator
            size="large"
            color={appliedTheme === "dark" ? "#fff" : "#000"}
          />
        ) : (
          <Text className="text-accent text-base">{message}</Text>
        )}
      </View>
    );
  }

  return (
    <>
      <StatusBar style={appliedTheme === "dark" ? "light" : "dark"} />
      <View
        className="flex-1 bg-primary p-4"
        style={{ paddingTop: top, paddingBottom: bottom + 50 }}
      >
        <Tab
          options={["all", "upcoming", "live", "completed"]}
          animationType="spring"
          inactiveLabelColor="teal"
          activeBackgroundColor="teal"
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
          springConfig={{ damping: 18, stiffness: 150 }}
          containerStyle={{ marginBottom: 15 }}
        />
        {filteredGames.length === 0 ? (
          <View className="flex-1 flex flex-row justify-center items-center">
            <Typography className="text-primary">
              No {selectedOption} matches :(
            </Typography>
          </View>
        ) : (
          <FlatList
            data={filteredGames}
            keyExtractor={(item) => item.id}
            renderItem={renderGameCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
}
