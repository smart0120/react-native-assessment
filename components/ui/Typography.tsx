// src/components/Typography.tsx

import React from "react";
import { Text, TextProps } from "react-native";

// Your variant ➔ className map
const variantClasses = {
  title: "text-3xl font-bold",
  heading: "text-2xl font-semibold",
  subheading: "text-xl font-medium",
  body: "text-base font-normal",
  caption: "text-sm font-light",
  error: "text-base text-red-500",
  success: "text-base text-green-500",
} as const;

const fontFamilyClasses = {
  primary: "font-primary",
  accent: "font-accent",
} as const;

export type TypographyVariant = keyof typeof variantClasses;
export type FontFamily = keyof typeof fontFamilyClasses;

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  fontFamily?: FontFamily;
  color?: string;
  className?: string;
}

export default function Typography({
  variant = "body",
  fontFamily = "primary",
  color,
  className = "",
  style,
  children,
  ...rest
}: TypographyProps) {
  // if you passed a literal color prop, apply it inline
  const colorStyle = color ? { color } : undefined;

  return (
    <Text
      className={`${variantClasses[variant]} ${fontFamilyClasses[fontFamily]} ${className}`}
      style={[colorStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
