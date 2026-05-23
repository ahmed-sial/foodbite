import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: "shift" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              color={color}
              name="home-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="clipboard-text-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
