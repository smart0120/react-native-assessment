import { useUser } from "@/context/UserProvider";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";

const WelcomeMessage = () => {
  const { profile, picks, winCount, lossCount, balance, loading, refresh } =
    useUser();

  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  const message = `Happy ${weekday}!`;

  return (
    <View className="flex flex-row gap-5 items-center">
      <View
        className="flex flex-row justify-center items-center border-accent rounded-full w-[75px] h-[75px]"
        style={{ borderWidth: 2 }}
      >
        <Image
          source={`https://i.pravatar.cc/120`}
          style={{ width: 60, height: 60, borderRadius: 30 }}
          contentFit="contain"
        />
      </View>
      <View className="flex flex-col gap-2">
        <Typography className="text-primary">{message}</Typography>
        <Typography variant="heading" className="text-accent" fontFamily="accent">
          {profile?.name}!
        </Typography>
      </View>
    </View>
  );
};

export default WelcomeMessage;
