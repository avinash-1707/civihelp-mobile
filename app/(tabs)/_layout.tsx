import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// 1. IMPORT THE PROVIDER
import { VolunteerProvider } from "@/context/VolunteerContext";

export default function AppTabsLayout() {
  return (
    // 2. WRAP YOUR TABS COMPONENT
    <VolunteerProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2E7D32", // Your primary green color
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff", // We can theme this later
            height: 60,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="(user)" // This links to the (user) folder
          options={{
            title: "Citizen",
            headerShown: false, // CRITICAL: Hides this tab's header
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(volunteer)" // This links to the (volunteer) folder
          options={{
            title: "Volunteer",
            headerShown: false, // Hides this tab's header
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="shield-checkmark-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </VolunteerProvider>
  );
}
