import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { AppThemeContext, AppThemeProvider } from "@/context/AppThemeProvider";
import { UserProvider } from "@/context/UserProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Tapestry: require("../assets/fonts/Tapestry-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AppThemeProvider>
      <AppThemeContext.Consumer>
        {({ appliedTheme }) => (
          <NavigationThemeProvider
            value={appliedTheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <UserProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="game/[id]"
                  options={{
                    title: "Game Detail",
                    headerTitleStyle: {
                      fontFamily: "Montserrat",
                    },
                    headerBackTitle: "Matches",
                    headerBackTitleStyle: { fontFamily: "Montserrat" },
                  }}
                />
                <Stack.Screen
                  name="+not-found"
                  options={{ title: "Not Found" }}
                />
              </Stack>
              <StatusBar style="auto" />
            </UserProvider>
          </NavigationThemeProvider>
        )}
      </AppThemeContext.Consumer>
    </AppThemeProvider>
  );
}
