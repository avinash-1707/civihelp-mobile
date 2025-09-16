import React from "react";
import { Stack } from "expo-router";

export default function VolunteerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // We set the title for the 'index' screen here
          title: "Volunteer Dashboard",
          headerStyle: { backgroundColor: "#1565C0" }, // Your theme blue
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {/* When you're ready, you can add more screens 
        for the volunteer flow here, e.g.:
        <Stack.Screen 
          name="volunteer-issue-details" 
          options={{ title: 'Issue Details' }} 
        />
      */}
    </Stack>
  );
}
