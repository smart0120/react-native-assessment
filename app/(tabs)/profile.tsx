import BalanceCard from "@/components/profile/BalanceCard";
import PickHistory from "@/components/profile/PickHistory";
import ThemeToggle from "@/components/profile/ThemeToggle";
import WelcomeMessage from "@/components/profile/WelcomeMessage";
import { AppThemeContext } from "@/context/AppThemeProvider";
import { useUser } from "@/context/UserProvider";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { loading } = useUser();

  const { theme, setTheme, appliedTheme } = useContext(AppThemeContext);

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

  return (
    <View
      className="flex-1 bg-primary"
      style={{ paddingTop: top, paddingBottom: bottom + 50 }}
    >
      <View className="p-4">
        <WelcomeMessage />
        <BalanceCard />
      </View>

      <PickHistory />

      <ThemeToggle />
    </View>
  );
}
