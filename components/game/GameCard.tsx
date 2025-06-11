import { Game } from "@/models/game";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";

type Props = {
  game: Game;
  index: number;
  brandImages: any[];
  vertical?: boolean;
  pressable?: boolean;
};

export default function GameCard({
  game,
  index,
  brandImages,
  vertical = false,
  pressable = true,
}: Props) {
  const router = useRouter();

  const dateStr = new Date(game.startTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const statusIcon =
    game.status === "live" ? "🔴" : game.status === "upcoming" ? "🕔" : "✅";

  const spread =
    game.odds?.spread != null
      ? `Spread: ${game.homeTeam.name} ${
          game.odds.spread > 0 ? `+${game.odds.spread}` : game.odds.spread
        }`
      : null;

  // Conditionally render either TouchableOpacity or View based on the pressable prop
  const Container = pressable ? TouchableOpacity : View;

  return (
    <Container
      onPress={pressable ? () => router.push(`/game/${game.id}`) : undefined}
      className={`${
        vertical ? "relative" : ""
      } bg-secondary rounded-lg p-4 pb-8 mb-4`}
    >
      <View
        className={`flex ${
          vertical ? "flex-col gap-7" : "flex-row"
        } justify-between items-center`}
      >
        {[game.homeTeam, game.awayTeam].map((team, tIndex) => (
          <View key={team.id} className="flex flex-col items-center gap-1">
            <Image
              source={
                brandImages[
                  (index + (tIndex === 0 ? 0 : 5)) % brandImages.length
                ]
              }
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
            <Typography
              className="text-accent font-bold text-2xl"
              variant="heading"
              fontFamily="accent"
            >
              {team.name}
            </Typography>
            <Typography className="text-primary font-bold text-lg">
              {team.abbreviation}
            </Typography>
          </View>
        ))}
      </View>

      {vertical && (
        <>
          <View className="absolute top-40 left-10">
            <Typography
              className="text-primary text-8xl"
              variant="heading"
              fontFamily="accent"
            >
              V
            </Typography>
          </View>
          <View className="absolute top-40 right-10">
            <Typography
              className="text-primary text-8xl"
              variant="heading"
              fontFamily="accent"
            >
              S
            </Typography>
          </View>
        </>
      )}
      {!vertical && (
        <View className="relative">
          <View className="absolute inset-0 -top-[220px] justify-center items-center flex">
            <Typography className="text-primary font-bold text-2xl">
              VS
            </Typography>
          </View>
          <Typography className="text-secondary text-center mt-2">
            {dateStr}
          </Typography>
        </View>
      )}

      {spread && (
        <Typography className="text-primary text-center mt-1">
          {spread}
        </Typography>
      )}
      <View className="absolute bottom-2 right-2 bg-primary px-2 py-1 rounded-full">
        <Typography
          className={
            game.status === "live"
              ? "text-accent"
              : game.status === "upcoming"
              ? "text-primary"
              : "text-secondary"
          }
        >
          {statusIcon} {game.status}
        </Typography>
      </View>
    </Container>
  );
}
