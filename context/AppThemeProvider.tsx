import { themes } from "@/utils/color-theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useDeviceColorScheme } from "nativewind";
import React, { createContext, useEffect, useState } from "react";
import { View } from "react-native";

export type ThemeOption = "light" | "dark" | "system";

interface AppThemeContextProps {
  theme: ThemeOption;
  setTheme: (value: ThemeOption) => void;
  appliedTheme: "light" | "dark";
}

export const AppThemeContext = createContext<AppThemeContextProps>({
  theme: "light",
  setTheme: () => {},
  appliedTheme: "light",
});

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colorScheme: systemScheme } = useDeviceColorScheme();
  const [theme, setTheme] = useState<ThemeOption>("system");

  // load saved preference
  useEffect(() => {
    AsyncStorage.getItem("app-theme").then((val) => {
      if (val === "light" || val === "dark" || val === "system") {
        setTheme(val);
      }
    });
  }, []);

  // save whenever user changes
  useEffect(() => {
    AsyncStorage.setItem("app-theme", theme);
  }, [theme]);

  // decide the final theme to apply
  const appliedTheme: "light" | "dark" =
    theme === "system" ? systemScheme ?? "light" : theme;

  return (
    <AppThemeContext.Provider value={{ theme, setTheme, appliedTheme }}>
      <View style={themes[appliedTheme]} className="flex-1">
        {children}
      </View>
    </AppThemeContext.Provider>
  );
};
