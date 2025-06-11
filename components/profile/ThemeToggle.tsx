import { AppThemeContext } from "@/context/AppThemeProvider";
import React, { useContext } from "react";
import { Pressable, View } from "react-native";
import Typography from "../ui/Typography";

const ThemeToggle = () => {
  const { theme, setTheme, appliedTheme } = useContext(AppThemeContext);

  return (
    <View className="py-8 px-4">
      <Typography className="text-accent mb-4">
        Current theme: {appliedTheme}
      </Typography>
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
            <Typography className="text-primary">{option}</Typography>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ThemeToggle;
