import React from "react";
import {
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Typography from "../ui/Typography";

type TabProps = {
  height?: number;
  options: string[];
  borderRadius?: number;
  controlWidth?: number;
  labelStyle?: any;
  selectedOption: string;
  internalPadding?: number;
  activeLabelColor?: string;
  containerStyle?: any;
  activeBoxStyle?: any;
  inactiveLabelColor?: string;
  activeLabelStyle?: any;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  animationType?: "timing" | "spring";
  onOptionPress?: (option: string) => void;
  springConfig?: { damping?: number; stiffness?: number };
};

const Tab: React.FC<TabProps> = React.memo(
  ({
    options,
    labelStyle,
    height = 42,
    onOptionPress,
    selectedOption,
    containerStyle,
    activeBoxStyle,
    activeLabelStyle,
    borderRadius = 9,
    controlWidth = 28,
    internalPadding = 20,
    animationType = "spring",
    activeLabelColor = "black",
    inactiveLabelColor = "gray",
    activeBackgroundColor = "white",
    inactiveBackgroundColor = "lightgray",
    springConfig = { damping: 80, stiffness: 200 },
  }) => {
    const { width: windowWidth } = useWindowDimensions();
    const TabWidth = windowWidth - controlWidth;
    const itemWidth = (TabWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      const targetPosition =
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2;

      return {
        left:
          animationType === "spring"
            ? withSpring(targetPosition, springConfig)
            : withTiming(targetPosition),
      };
    }, [selectedOption, options, itemWidth, animationType, springConfig]);

    return (
      <View
        className="flex-row bg-secondary"
        style={[
          {
            height: height,
            borderRadius: borderRadius,
            width: TabWidth,
            paddingLeft: internalPadding / 2,
          },
          containerStyle,
        ]}
      >
        <Animated.View
          className="absolute top-[10%] h-[80%] rounded-lg shado bg-primary"
          style={[
            {
              width: itemWidth,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 0 },
              elevation: 3,
            },
            rStyle,
            activeBoxStyle,
          ]}
        />
        {options.map((option) => {
          const isActive = option === selectedOption;
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              className="items-center justify-center"
              style={[
                {
                  width: itemWidth,
                },
              ]}
            >
              <Typography
                style={[isActive ? activeLabelStyle : labelStyle]}
                className={isActive ? "text-accent font-bold" : "text-primary"}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

export default Tab;
