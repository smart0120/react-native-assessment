import { vars } from "nativewind";

/**
 * Define CSS variable themes for light and dark modes
 */
export const themes = {
  light: vars({
    // Background (Sky Blue Theme)
    "--color-bg-primary": "#E0F2FE", // Light sky blue (background)
    "--color-bg-secondary": "#BFDBFE", // Slightly darker sky blue (cards/sections)

    // Primary (Deep Blue - Trust & Stability)
    "--color-primary-default": "#1D4ED8", // Strong blue (buttons, headers)
    "--color-primary-light": "#3B82F6", // Lighter blue (hover states)

    // Secondary (Contrast - Energy & Action)
    "--color-secondary-default": "#7C3AED", // Vibrant purple (accent)
    "--color-secondary-light": "#8B5CF6", // Soft purple (secondary actions)

    // Accent (Success/Stats - High Visibility)
    "--color-accent-default": "#10B981", // Emerald green (correct predictions)
    "--color-accent-light": "#34D399", // Light green (positive indicators)

    // Neutrals (Readability)
    "--color-text-primary": "#1E293B", // Dark slate (main text)
    "--color-text-secondary": "#475569", // Gray (secondary text)
    "--color-border": "#CBD5E1", // Light border
    "--color-overlay": "rgba(0, 0, 0, 0.1)", // Subtle overlay
  }),
  dark: vars({
    // Background (Dark Purple Theme)
    "--color-bg-primary": "#1E1B4B", // Deep purple (background)
    "--color-bg-secondary": "#2E2A6E", // Slightly lighter purple (cards/sections)

    // Primary (Electric Blue - Stands Out)
    "--color-primary-default": "#6366F1", // Bright indigo (buttons, headers)
    "--color-primary-light": "#818CF8", // Lighter indigo (hover states)

    // Secondary (Vibrant Purple - Accent)
    "--color-secondary-default": "#A855F7", // Neon purple (accent)
    "--color-secondary-light": "#C084FC", // Soft purple (secondary actions)

    // Accent (Success/Stats - Glow Effect)
    "--color-accent-default": "#22D3EE", // Cyan (correct predictions)
    "--color-accent-light": "#67E8F9", // Light cyan (positive indicators)

    // Neutrals (Readability in Dark Mode)
    "--color-text-primary": "#E2E8F0", // Off-white (main text)
    "--color-text-secondary": "#94A3B8", // Light gray (secondary text)
    "--color-border": "#4B5563", // Dark border
    "--color-overlay": "rgba(255, 255, 255, 0.05)", // Subtle overlay
  }),
};
