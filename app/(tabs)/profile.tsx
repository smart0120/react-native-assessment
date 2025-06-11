import { AppThemeContext } from "@/context/AppThemeProvider";
import { useUser } from "@/context/UserProvider";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { profile, picks, winCount, lossCount, balance, loading, refresh } =
    useUser();

  const { theme, setTheme, appliedTheme } = useContext(AppThemeContext);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-primary"
      style={{ paddingTop: top, paddingBottom: bottom + 50 }}
    >
      <View className="">
        <Text className="text-primary text-2xl font-bold mb-2">
          {profile?.name}'s Profile
        </Text>

        <View className="">
          <Text className="text-accent">Balance: ${balance.toFixed(2)}</Text>
          <Text className="text-primary mt-1">Wins: {winCount}</Text>
          <Text className="text-primary">Losses: {lossCount}</Text>
        </View>
      </View>

      <Text className="text-primary text-lg font-semibold mb-2">Your Picks</Text>
      <ScrollView
        className="flex-1 bg-primary p-4"
        contentContainerStyle={{ paddingTop: top }}
      >
        {picks.length === 0 && (
          <Text className="text-slate italic mb-2">No picks yet.</Text>
        )}

        {picks.map((pick, idx) => (
          <View
            key={`${pick.gameId}-${idx}`}
            className="bg-secondary-light/20 rounded p-3 mb-2"
          >
            <Text className="text-primary">Game: {pick.gameId}</Text>
            <Text className="text-primary">Pick: {pick.selection}</Text>
            {pick.spread != null && (
              <Text className="text-primary">Spread: {pick.spread}</Text>
            )}
            <Text
              className={`mt-1 font-semibold ${
                pick.result === "win" ? "text-green-400" : "text-red-400"
              }`}
            >
              Result: {pick.result.toUpperCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={refresh}
        className="mt-4 bg-accent px-4 py-2 rounded"
      >
        <Text className="text-dark text-center font-medium">Refresh</Text>
      </TouchableOpacity>
      <View className="pt-16">
        <Text className="text-accent mb-4">Current theme: {appliedTheme}</Text>
        <View className="flex-row space-x-2">
          {(["system", "light", "dark"] as const).map((option) => (
            <Pressable
              key={option}
              onPress={() => setTheme(option)}
              className={`
               px-4 py-2 rounded
               ${theme === option ? "bg-secondary" : "bg-secondary-light/50"}
             `}
            >
              <Text className="text-slate">{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
