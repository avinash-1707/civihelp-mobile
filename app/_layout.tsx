import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// You can also wrap this in any global providers (Theme, Auth, etc.)

export default function RootLayout() {
  return (
    // GestureHandlerRootView is needed for the drawer to work
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/*
          This screen loads your entire Drawer navigation.
          We hide the header here because the Drawer
          layout already provides its own CustomHeader.
        */}
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

        {/*
          This screen is for your "Report Problem" form.
          'presentation: modal' makes it slide up from the bottom.
        */}
        <Stack.Screen
          name="report"
          options={{
            presentation: "modal",
            title: "Report a Problem",
            // You could add a custom close button here if needed
            // headerLeft: () => ( ... )
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
