import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2E7D32", // Your primary green color
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index" // This links to app/(drawer)/(tabs)/index.tsx
        options={{
          title: "Home",
          headerShown: false, // Hides default header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-issues" // Links to app/(drawer)/(tabs)/my-issues.tsx
        options={{
          title: "My Issues",
          headerShown: false, // Hides default header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // Links to app/(drawer)/(tabs)/explore.tsx
        options={{
          title: "Explore",
          headerShown: false, // Hides default header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications" // Links to app/(drawer)/(tabs)/notifications.tsx
        options={{
          title: "Updates",
          headerShown: false, // Hides default header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
