import { useUser } from "@/context/UserProvider";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";

export default function PickHistory() {
  const { picks, refresh } = useUser();
  return (
    <>
      <Typography className="px-4 text-primary text-lg font-semibold">
        Your Picks
      </Typography>
      <ScrollView className="flex-1 bg-secondary m-4 rounded-lg p-4">
        {picks.length === 0 && (
          <Typography className="text-primary text-center italic mt-4">
            No picks yet.
          </Typography>
        )}

        {picks.map((pick, idx) => (
          <View
            key={`${pick.gameId}-${idx}`}
            className="bg-primary rounded p-3 mb-2"
          >
            <Typography className="text-primary">Game: {pick.gameId}</Typography>
            <Typography className="text-primary">Pick: {pick.selection}</Typography>
            {pick.spread != null && (
              <Typography className="text-primary">Spread: {pick.spread}</Typography>
            )}
            <Typography
              className={`mt-1 font-semibold ${
                pick.result === "win" ? "text-green-400" : "text-red-400"
              }`}
            >
              Result: {pick.result.toUpperCase()}
            </Typography>
          </View>
        ))}
      </ScrollView>
      <View className="px-4">
        <TouchableOpacity
          onPress={refresh}
          className="mt-4 bg-accent px-4 py-2 rounded"
        >
          <Typography className="text-dark text-center font-medium">Refresh</Typography>
        </TouchableOpacity>
      </View>
    </>
  );
}
