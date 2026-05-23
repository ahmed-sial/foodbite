import { ChevronDownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";

const Header = () => {
  const router = useRouter();
  const [location, setLocation] = useState("Home");

  return (
    <View style={styles.container}>
      {/* Left: Delivery location select */}
      <View style={styles.locationWrapper}>
        <View>
          <Text style={styles.deliveryLabel}>DELIVERY TO</Text>
          <Select
            selectedValue={location}
            onValueChange={(val) => setLocation(val)}
          >
            <SelectTrigger variant="outline" style={styles.selectTrigger}>
              <SelectInput
                placeholder="Select location"
                style={styles.selectInput}
              />
              <SelectIcon as={ChevronDownIcon} style={styles.chevron} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Home" value="Home" />
                <SelectItem label="Work" value="Work" />
                <SelectItem label="Other" value="Other" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>
      </View>

      {/* Center: App name */}
      <Text style={styles.appName}>FOODBITE</Text>

      {/* Right: Notification bell */}
      <TouchableOpacity
        style={styles.bellButton}
        onPress={() => router.push("/(tabs)/notifications")}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name="bell-outline"
          size={ms(22)}
          color="#222"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: ms(4),
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(4),
    flex: 1,
  },
  deliveryLabel: {
    fontSize: ms(9),
    fontWeight: "500",
    color: "#888",
    letterSpacing: ms(0.5),
  },
  selectTrigger: {
    flexDirection: "row",
    alignItems: "center",
    height: ms(22),
    padding: 0,
  },
  selectInput: {
    fontSize: ms(13),
    fontWeight: "700",
    color: "#111",
    padding: 0,
  },
  chevron: {
    width: ms(16),
    height: ms(16),
    color: "#222",
  },
  appName: {
    fontSize: ms(16),
    fontWeight: "800",
    letterSpacing: ms(1),
    color: "#111",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  bellButton: {
    alignItems: "flex-end",
    flex: 1,
  },
});
