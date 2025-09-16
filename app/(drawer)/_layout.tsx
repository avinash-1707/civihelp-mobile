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

// Import the TSX component we just made
import CustomHeader from "../../components/CustomHeader";

// --- Custom Drawer Content (Typed) ---
// We use DrawerContentComponentProps for the props
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();

  const handleReportPress = () => {
    props.navigation.closeDrawer();
    router.push("/report");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    props.navigation.closeDrawer();
    // router.replace('/login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      {/* Spacer to push items to the bottom */}
      <View style={{ flex: 1 }} />

      <DrawerItem
        label="Report Problem"
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        style={{ backgroundColor: "#1565C0" }} // Blue color
        onPress={handleReportPress}
        icon={({ color, size }) => (
          <Ionicons name="add-circle" size={size} color="#fff" />
        )}
      />

      <DrawerItem
        label="Logout"
        labelStyle={{ color: "#E53935" }} // Red color
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color="#E53935" />
        )}
      />
    </DrawerContentScrollView>
  );
}

// --- Drawer Layout Definition (Typed) ---
export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // Use DrawerHeaderProps for the header's props
        header: (props: DrawerHeaderProps) => <CustomHeader {...props} />,

        // Styling for the drawer menu
        drawerStyle: { backgroundColor: "#f4f4f4" },
        drawerActiveTintColor: "#2E7D32", // Your green color
        drawerInactiveTintColor: "#333",
        // drawerLabelStyle: { marginLeft: -20 }, // <-- REMOVED THIS LINE
      }}
    >
      <Drawer.Screen
        name="(tabs)" // This points to the app/(drawer)/(tabs) folder
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile" // Points to app/(drawer)/profile.tsx
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="rewards" // Points to app/(drawer)/rewards.tsx
        options={{
          title: "Rewards & Civic Points",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ribbon-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings" // Points to app/(drawer)/settings.tsx
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="help" // Points to app/(drawer)/help.tsx
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
