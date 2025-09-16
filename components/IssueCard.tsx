import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Import the types we defined in the HomeScreen
import { Issue, IssueStatus } from "../app/(drawer)/(tabs)/index";

// --- Helper for Status Color (Unchanged) ---
const getStatusColor = (status: IssueStatus) => {
  switch (status) {
    case "Pending":
      return "#D32F2F"; // A strong red
    case "In Progress":
      return "#1565C0"; // Your theme blue
    case "Resolved":
      return "#2E7D32"; // Your theme green
    default:
      return "#888";
  }
};

// --- Component Props (Unchanged) ---
interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const statusColor = getStatusColor(issue.status);

  // --- Upvote State (Unchanged) ---
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(issue.upvotes || 0);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvoteCount(upvoteCount - 1);
      setHasUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: issue.imageUrl }}
        style={styles.image}
        defaultSource={{ uri: "https://via.placeholder.com/400x200" }}
      />
      <View style={styles.content}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{issue.status.toUpperCase()}</Text>
        </View>
        <Text style={styles.description}>{issue.description}</Text>

        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#555" />
            <Text style={styles.locationText}>{issue.location}</Text>
          </View>

          <Pressable
            style={[
              styles.upvoteButton, // Updated style
              hasUpvoted && styles.upvotedButtonActive,
            ]}
            onPress={handleUpvote}
          >
            <Ionicons
              name={hasUpvoted ? "arrow-up" : "arrow-up-outline"}
              size={18}
              color={hasUpvoted ? "#fff" : "#2E7D32"} // Icon color changes
            />
            <Text
              style={[
                styles.upvoteText, // Updated style
                hasUpvoted && styles.upvotedTextActive,
              ]}
            >
              {upvoteCount}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#eee",
  },
  content: {
    padding: 20, // <-- INCREASED "BREATHING SPACE" (was 16)
  },
  statusBadge: {
    position: "absolute",
    top: -10,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20, // <-- INCREASED "BREATHING SPACE" (was 16)
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
    flexShrink: 1,
  },
  upvoteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14, // <-- Adjusted padding
    paddingVertical: 8, // <-- Adjusted padding
    borderRadius: 20,
    backgroundColor: "#E8F5E9", // <-- "More beautiful" light green bg
    // Removed the border
  },
  upvotedButtonActive: {
    backgroundColor: "#2E7D32", // Solid green when active
  },
  upvoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32", // Dark green text
    marginLeft: 6,
  },
  upvotedTextActive: {
    color: "#fff", // White text when active
  },
});

export default IssueCard;
