import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Types & Dummy Data ---

// 1. Badges
interface Badge {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap; // Use Ionicons names as type
  description: string;
}
const DUMMY_BADGES: Badge[] = [
  {
    id: "1",
    name: "First Report",
    icon: "send-outline",
    description: "Submitted your first issue",
  },
  {
    id: "2",
    name: "Active Citizen",
    icon: "walk-outline",
    description: "Reported 5 issues",
  },
  {
    id: "3",
    name: "Community Helper",
    icon: "people-outline",
    description: "Got 10 upvotes",
  },
  {
    id: "4",
    name: "Streak",
    icon: "flame-outline",
    description: "Reported 3 days in a row",
  },
];

// 2. Leaderboard
interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
}
const DUMMY_LEADERBOARD: LeaderboardEntry[] = [
  { id: "101", name: "Aarav Sharma", points: 850 },
  { id: "102", name: "Priya Patel", points: 720 },
  { id: "103", name: "Rohan Gupta", points: 685 },
  { id: "104", name: "YourUser", points: 125 }, // Highlight the user
  { id: "105", name: "Sanya Verma", points: 90 },
];
const YOUR_USER_ID = "104"; // Dummy user ID to highlight in list

// --- Reusable Components (in-file) ---

// 1. Badge Item for horizontal list
const BadgeItem: React.FC<{ item: Badge }> = ({ item }) => (
  <View style={styles.badge}>
    <Ionicons name={item.icon} size={40} color="#2E7D32" />
    <Text style={styles.badgeName}>{item.name}</Text>
  </View>
);

// 2. Leaderboard Item for vertical list
const LeaderboardItem: React.FC<{ item: LeaderboardEntry; rank: number }> = ({
  item,
  rank,
}) => (
  <View
    style={[
      styles.leaderboardItem,
      item.id === YOUR_USER_ID && styles.userRank,
    ]}
  >
    <Text style={styles.rankText}>{rank + 1}</Text>
    <Ionicons
      name="person-circle-outline"
      size={32}
      color="#555"
      style={styles.rankIcon}
    />
    <Text style={styles.rankName}>{item.name}</Text>
    <Text style={styles.rankPoints}>🏅 {item.points}</Text>
  </View>
);

// --- Main Screen Component ---
export default function RewardsScreen() {
  const userPoints = 125; // Dummy points

  return (
    <ScrollView style={styles.container}>
      {/* 1. Current Points Card */}
      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Your Civic Points</Text>
        <Text style={styles.pointsValue}>🏅 {userPoints}</Text>
        <Text style={styles.pointsSubtitle}>
          Keep up the great work, citizen!
        </Text>
      </View>

      {/* 2. My Badges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Badges</Text>
        <FlatList
          data={DUMMY_BADGES}
          renderItem={({ item }) => <BadgeItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgeList}
        />
      </View>

      {/* 3. Leaderboard Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <FlatList
          data={DUMMY_LEADERBOARD}
          renderItem={({ item, index }) => (
            <LeaderboardItem item={item} rank={index} />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Disable nested scrolling
          style={styles.leaderboardList}
        />
      </View>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  pointsCard: {
    backgroundColor: "#2E7D32", // Your theme green
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pointsLabel: {
    fontSize: 16,
    color: "#E8F5E9",
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: "#C8E6C9",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 8,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  badgeList: {
    paddingLeft: 16,
  },
  badge: {
    backgroundColor: "#f0f2f5",
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    width: 110,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  leaderboardList: {
    paddingHorizontal: 16,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  userRank: {
    backgroundColor: "#E3F2FD", // Light blue to highlight user
    borderWidth: 1,
    borderColor: "#1565C0",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    width: 30,
  },
  rankIcon: {
    marginHorizontal: 8,
  },
  rankName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  rankPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
});
