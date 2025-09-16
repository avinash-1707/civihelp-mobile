import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
// The import path is now three levels deep
import CustomHeader from "../../../components/CustomHeader";

// --- Custom Drawer Content (Unchanged) ---
// This component correctly adds "Report Problem" and "Logout"
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();

  const handleReportPress = () => {
    props.navigation.closeDrawer();
    router.push("/report"); // Goes to the root modal
  };

  const handleLogout = () => {
    console.log("Logging out...");
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }} />
      <DrawerItem
        label="Report Problem"
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        style={{ backgroundColor: "#1565C0" }}
        onPress={handleReportPress}
        icon={({ size }) => (
          <Ionicons name="add-circle" size={size} color="#fff" />
        )}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: "#E53935" }}
        onPress={handleLogout}
        icon={({ size }) => (
          <Ionicons name="log-out-outline" size={size} color="#E53935" />
        )}
      />
    </DrawerContentScrollView>
  );
}

// --- Drawer Layout Definition (CORRECTED) ---
export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: (props: DrawerHeaderProps) => <CustomHeader {...props} />,
        drawerStyle: { backgroundColor: "#f4f4f4" },
        drawerActiveTintColor: "#2E7D32",
        drawerInactiveTintColor: "#333",
      }}
    >
      {/* This is the fix. We list 'index' first.
        It links to your app/(tabs)/(user)/index.tsx file.
      */}
      <Drawer.Screen
        name="index" // <-- Points to index.tsx (your new dashboard)
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {/* These screens were missing from the drawer list.
       */}
      <Drawer.Screen
        name="my-issues" // <-- Points to my-issues.tsx
        options={{
          title: "My Issues",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="accountability" // <-- Points to accountability.tsx
        options={{
          title: "Accountability",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications" // <-- Points to notifications.tsx
        options={{
          title: "Notifications",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      {/* These screens were already correct.
       */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="rewards"
        options={{
          title: "Rewards & Civic Points",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ribbon-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: "Help & Support",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-buoy-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
