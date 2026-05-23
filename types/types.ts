import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Category {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}
