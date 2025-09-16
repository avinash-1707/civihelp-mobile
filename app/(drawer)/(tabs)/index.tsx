import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import IssueCard from "@/components/IssueCard";

// --- Types for your data ---
export type IssueStatus = "Pending" | "In Progress" | "Resolved";

export interface Issue {
  id: string;
  location: string;
  imageUrl: string;
  status: IssueStatus;
  description: string;
  upvotes: number;
}

// --- Dummy Data for the prototype ---
const DUMMY_ISSUES: Issue[] = [
  {
    id: "1",
    location: "Sector 21, Gurgaon",
    imageUrl: "https://example.com/images/pothole.jpg",
    status: "Pending",
    description: "Large pothole on main road, causing traffic jams.",
    upvotes: 12,
  },
  {
    id: "2",
    location: "Near MG Road Metro",
    imageUrl: "https://example.com/images/streetlight.jpg",
    status: "In Progress",
    description: "Streetlight not working for 3 days.",
    upvotes: 12,
  },
  {
    id: "3",
    location: "Sushant Lok, Phase 1",
    imageUrl: "https://example.com/images/garbage.jpg",
    status: "Resolved",
    description: "Garbage overflow from collection bin.",
    upvotes: 12,
  },
  {
    id: "4",
    location: "Sector 44, opp. Gold Souk",
    imageUrl: "https://example.com/images/water-logging.jpg",
    status: "Pending",
    description: "Severe water logging after minor rain.",
    upvotes: 12,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const openReportForm = () => {
    router.push("/report"); // Navigates to app/report.tsx as a modal
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_ISSUES}
        renderItem={({ item }) => <IssueCard issue={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button (FAB) */}
      <Pressable style={styles.fab} onPress={openReportForm}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.fabText}>Report Problem</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // A light grey background
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Ensure list scrolls above the FAB
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#2E7D32", // Your primary green color
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
