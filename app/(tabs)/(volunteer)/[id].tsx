import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { DUMMY_ISSUES, Issue } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";

// A small helper component to show a styled status badge
const StatusBadge = ({ status }: { status: Issue["status"] }) => {
  const style = [
    styles.badge,
    status === "Pending" && styles.badgePending,
    status === "In Progress" && styles.badgeInProgress,
    status === "Resolved" && styles.badgeResolved,
  ];
  return (
    <View style={style}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

export default function IssueDetailsScreen() {
  const router = useRouter();
  // 1. Get the 'id' from the URL (passed from the card)
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Find the correct issue from our dummy data
  const issue = useMemo(
    () => DUMMY_ISSUES.find((item) => item.id === id),
    [id]
  );

  // 3. Handle what happens when "Apply" is pressed
  const handleApply = () => {
    // For now, just show an alert.
    // In a real app, you'd send this to your backend.
    Alert.alert(
      "Application Sent",
      "Your application to work on this issue has been submitted.",
      [{ text: "OK", onPress: () => router.back() }] // Go back after alert
    );
  };

  // 4. Handle "Not Found" case
  if (!issue) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.notFoundText}>Issue not found.</Text>
      </View>
    );
  }

  // 5. Render the details
  return (
    <SafeAreaView style={styles.container}>
      {/* This dynamically sets the screen's header title */}
      <Stack.Screen options={{ title: issue.location }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: issue.imageUrl }} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.locationTitle}>{issue.location}</Text>

          {/* Details Row (Status & Upvotes) */}
          <View style={styles.row}>
            <StatusBadge status={issue.status} />
            <View style={styles.upvoteContainer}>
              <Ionicons name="arrow-up" size={16} color="#1565C0" />
              <Text style={styles.upvoteText}>{issue.upvotes} upvotes</Text>
            </View>
          </View>

          <Text style={styles.descriptionTitle}>Full Description</Text>
          <Text style={styles.descriptionText}>{issue.description}</Text>
        </View>
      </ScrollView>

      {/* 6. The "Apply for Work" button, pinned to the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply for Work</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // NEW STYLE for the "Not Found" case
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5", // Match the list background
  },
  // NEW STYLE for the "Not Found" text
  notFoundText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
  },
  scrollContainer: {
    paddingBottom: 100, // Make space for the button
  },
  image: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  upvoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  upvoteText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1565C0",
    marginLeft: 6,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  // Button Styles
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30, // Extra padding for home bar
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  applyButton: {
    backgroundColor: "#1565C0", // Your theme blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  // Badge Styles
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  badgePending: {
    backgroundColor: "#f57c00", // Orange
  },
  badgeInProgress: {
    backgroundColor: "#1976d2", // Blue
  },
  badgeResolved: {
    backgroundColor: "#388e3c", // Green
  },
});
