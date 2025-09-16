import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import IssueCard from "@/components/IssueCard";
import { Issue, DUMMY_ISSUES } from "@/constants/data";

// --- Header component with updated sizes ---
const DashboardHeader = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(`/(user)/${path}`);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.welcome}>Welcome, Rohan!</Text>

      {/* "Report Problem" Card (Sleeker) */}
      <Pressable
        style={[styles.card, styles.reportCard]}
        onPress={() => router.push("/report")}
      >
        {/* Icon size reduced from 40 to 30 */}
        <Ionicons name="add-circle" size={30} color="#fff" />
        <Text style={styles.reportCardText}>Report a New Problem</Text>
      </Pressable>

      {/* Navigation Cards (All 3 in one row) */}
      <View style={styles.cardContainer}>
        <Pressable
          style={[styles.card, styles.navCard]} // navCard width is now 32%
          onPress={() => navigateTo("my-issues")}
        >
          {/* Icon size reduced from 32 to 28 */}
          <Ionicons name="list-outline" size={28} color="#1565C0" />
          <Text style={styles.navCardText}>My Issues</Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.navCard]} // navCard width is now 32%
          onPress={() => navigateTo("notifications")}
        >
          {/* Icon size reduced from 32 to 28 */}
          <Ionicons name="notifications-outline" size={28} color="#1565C0" />
          <Text style={styles.navCardText}>Updates</Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.exploreCard]} // exploreCard also gets 32% width
          onPress={() => navigateTo("accountability")}
        >
          {/* Icon size reduced from 32 to 28 */}
          <Ionicons name="stats-chart-outline" size={28} color="#1565C0" />
          <Text style={styles.exploreCardText}>Rankings</Text>
        </Pressable>
      </View>

      {/* Title for the list below */}
      <Text style={styles.nearbyTitle}>Nearby Issues</Text>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_ISSUES}
        renderItem={({ item }) => <IssueCard issue={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<DashboardHeader />}
      />
    </View>
  );
}

// --- Styles Updated ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    paddingTop: 16,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16, // <-- REDUCED PADDING (was 20)
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  reportCard: {
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
  },
  reportCardText: {
    color: "#fff",
    fontSize: 18, // <-- REDUCED FONT SIZE (was 20)
    fontWeight: "bold",
    marginLeft: 15,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navCard: {
    alignItems: "center",
    width: "32%", // <-- CHANGED FROM 48% to fit 3-across
    paddingHorizontal: 10, // Added horizontal padding for smaller screens
  },
  navCardText: {
    fontSize: 14, // <-- REDUCED FONT SIZE (was 18)
    fontWeight: "500",
    color: "#333",
    marginTop: 10,
    textAlign: "center", // Added for better text wrapping
  },
  exploreCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: "32%", // <-- ADDED WIDTH to fit 3-across
    paddingHorizontal: 10, // Added horizontal padding
  },
  exploreCardText: {
    color: "#000",
    fontSize: 14, // <-- REDUCED FONT SIZE (was 18)
    marginTop: 10,
    textAlign: "center", // Added for better text wrapping
  },
  nearbyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 10,
  },
});
