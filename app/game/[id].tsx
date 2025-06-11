import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

import GameCard from "@/components/game/GameCard";
import Typography from "@/components/ui/Typography";
import { AppThemeContext } from "@/context/AppThemeProvider";
import { useUser } from "@/context/UserProvider";
import { Game } from "@/models/game";
import { getGameById } from "@/services/gameService";
import { submitPick } from "@/services/userService";

export default function GameDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { refresh } = useUser();
  const userId = "user-123";

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPick, setSelectedPick] = useState<
    "home" | "away" | "spread" | null
  >(null);
  const [submitting, setSubmitting] = useState(false);
  const { appliedTheme } = useContext(AppThemeContext);
  const isDisabled = submitting || game?.status !== "upcoming";

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

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getGameById(id)
      .then((g) => setGame(g as any))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePick = async (pick: "home" | "away" | "spread") => {
    if (!game || !userId) return;

    setSubmitting(true);
    try {
      await submitPick({
        gameId: game.id,
        userId,
        selection: pick,
        spread: pick === "spread" ? game.odds?.spread : undefined,
        timestamp: new Date().toISOString(),
        result: Math.random() > 0.5 ? "win" : "loss",
      });
      setSelectedPick(pick);
      await refresh();
      Alert.alert("Success", `You picked ${pick}`);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to submit pick");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator
          size="large"
          color={appliedTheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  if (error || !game) {
    return (
      <View className="flex-1 justify-center items-center bg-primary p-4">
        <Typography className="text-accent text-base">
          {error ?? "Game not found"}
        </Typography>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-4 py-2 bg-secondary rounded"
        >
          <Typography className="text-primary">Go back</Typography>
        </TouchableOpacity>
      </View>
    );
  }

  const start = format(new Date(game.startTime), "PPpp");

  return (
    <View className="flex-1 bg-primary p-4">
      <ScrollView contentContainerClassName="flex-1">
        <GameCard
          game={game}
          index={Number(game.id) - 1}
          brandImages={brandImages}
          pressable={false}
          vertical
        />

        <Typography className="text-accent mb-4 text-center">
          {start}
        </Typography>

        {game.status !== "upcoming" && (
          <Typography className="text-red-400 text-center mb-4">
            Prediction disabled - game is {game.status}
          </Typography>
        )}
      </ScrollView>

      <View className="flex flex-col gap-3 pb-5">
        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => handlePick("home")}
          className={`px-4 py-3 rounded border-primary ${
            selectedPick === "home" ? "bg-secondary" : "bg-secondary-light/50"
          } ${isDisabled ? "opacity-40" : ""}`}
          style={{ borderWidth: 1 }}
        >
          <Typography className="text-primary text-center">
            Pick {game.homeTeam.name}
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => handlePick("away")}
          className={`px-4 py-3 rounded border-primary ${
            selectedPick === "away" ? "bg-secondary" : "bg-secondary-light/50"
          } ${isDisabled ? "opacity-40" : ""}`}
          style={{ borderWidth: 1 }}
        >
          <Typography className="text-primary text-center">
            Pick {game.awayTeam.name}
          </Typography>
        </TouchableOpacity>

        {game.odds?.spread != null && (
          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => handlePick("spread")}
            className={`px-4 py-3 rounded border-primary ${
              selectedPick === "spread"
                ? "bg-secondary"
                : "bg-secondary-light/50"
            } ${isDisabled ? "opacity-40" : ""}`}
            style={{ borderWidth: 1 }}
          >
            <Typography className="text-primary text-center">
              Pick the spread (
              {game.odds.spread > 0 ? `+${game.odds.spread}` : game.odds.spread}
              )
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
