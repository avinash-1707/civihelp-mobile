import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigationState } from "@react-navigation/native"; // Import this hook

// This function finds the name of the currently active tab
const getActiveTabName = (navigationState: any): string => {
  if (!navigationState) return "";

  const drawerRoute = navigationState.routes.find(
    (r: any) => r.name === "(drawer)"
  );
  if (!drawerRoute || !drawerRoute.state) return "";

  const tabsRoute = drawerRoute.state.routes.find(
    (r: any) => r.name === "(tabs)"
  );
  if (!tabsRoute || !tabsRoute.state) return "";

  const tabState = tabsRoute.state;
  if (tabState.index === undefined || !tabState.routes) return "";

  const activeTabRoute = tabState.routes[tabState.index];

  return activeTabRoute.name; // This will be 'index', 'my-issues', etc.
};

// Map file names to the titles you want
const getScreenTitle = (routeName: string, drawerTitle: string) => {
  switch (routeName) {
    case "index":
      return "Home"; // This will be hidden anyway
    case "my-issues":
      return "My Issues";
    case "explore":
      return "Explore Dashboard";
    case "notifications":
      return "Notifications";
    default:
      // For non-tab screens (Profile, Settings, etc.)
      return drawerTitle;
  }
};

const CustomHeader = (props: DrawerHeaderProps) => {
  const navigation = useNavigation();
  const router = useRouter();

  // Get the full navigation state
  const navigationState = useNavigationState((state) => state);

  // Get the name of the top-level drawer route (e.g., '(tabs)', 'profile')
  const drawerRouteName = props.route.name;

  // Figure out the *actual* active screen
  let activeRouteName = drawerRouteName;
  if (drawerRouteName === "(tabs)") {
    activeRouteName = getActiveTabName(navigationState);
  }

  // Check if we are on the Home tab
  const isHomePage = activeRouteName === "index";

  // Get the correct title for the screen
  const title = getScreenTitle(
    activeRouteName,
    props.options.title || "Civihelp"
  );

  // Dummy points
  const civicPoints = 125;

  const openDrawer = () => {
    // This is how you open the sidebar
    (navigation as any).openDrawer();
  };

  const goToProfile = () => {
    // Navigate to the profile screen
    router.push("/(drawer)/profile");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Side: Menu Button */}
        <View style={styles.left}>
          <Pressable onPress={openDrawer} style={styles.iconButton}>
            <Ionicons name="menu" size={28} color="#fff" />
          </Pressable>
        </View>

        {/* Center: Screen Title (Hidden on Home) */}
        <View style={styles.center}>
          {!isHomePage && ( // <-- TITLE HIDES ON HOME PAGE
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {/* Right Side: Points (Home only) & Profile */}
        <View style={styles.right}>
          {/* Civic Points Badge (Home Page Only) */}
          {isHomePage && ( // <-- POINTS ONLY SHOW ON HOME PAGE
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🏅 {civicPoints}</Text>
            </View>
          )}

          {/* Profile Icon (Always shown) */}
          <Pressable onPress={goToProfile} style={styles.iconButton}>
            <Ionicons name="person-circle" size={32} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1565C0", // Your primary blue color
  },
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  left: {
    width: 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    width: "auto",
    minWidth: 40, // Match left side for balance
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 5,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CustomHeader;
