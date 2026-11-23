import { Platform } from "react-native";
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000");
export const COLORS = {
  yellow: "#F8BE00",
  orange: "#FF6500",
  cream: "#FFFDF5",
  cyan: "#25C7E8",
  ink: "#171717",
  muted: "#6C6A63",
  card: "#F1F0E7",
  border: "#171717",
};
