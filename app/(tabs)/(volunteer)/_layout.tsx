import React from "react";
import { Stack } from "expo-router";

export default function VolunteerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // This is the title for the 'index' screen (Dashboard)
          title: "Volunteer Dashboard",
          headerStyle: { backgroundColor: "#1565C0" }, // Your theme blue
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {/* NEW SCREEN 1: The Issue Details Page
        This is a dynamic route that matches '/[id]'
      */}
      <Stack.Screen
        name="[id]"
        options={{
          title: "Issue Details",
          headerStyle: { backgroundColor: "#1565C0" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "Back", // Adds a 'Back' title on iOS
        }}
      />

      {/* NEW SCREEN 2: The Registration Form Page
       */}
      <Stack.Screen
        name="register"
        options={{
          title: "Volunteer Registration",
          headerStyle: { backgroundColor: "#1565C0" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {/* NEW SCREEN 3: The Onboarding "Popup" Modal
       */}
      <Stack.Screen
        name="onboarding-modal"
        options={{
          // This makes it slide up from the bottom
          presentation: "modal",
          // We'll hide the header to make it look more like a popup
          headerShown: false,
        }}
      />
    </Stack>
  );
}
