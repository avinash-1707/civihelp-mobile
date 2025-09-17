import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Issue } from "@/constants/data"; // Your Issue type
import { Ionicons } from "@expo/vector-icons";

interface VolunteerIssueCardProps {
  issue: Issue;
}

export default function VolunteerIssueCard({ issue }: VolunteerIssueCardProps) {
  const router = useRouter();

  const handlePress = () => {
    // Navigates to the dynamic details screen, e.g., /volunteer/1
    router.push(`/(volunteer)/${issue.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* 1. PHOTO (from issue.imageUrl) */}
      <Image
        source={{
          uri: issue.imageUrl, // This is correct from your data
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        {/* 2. TITLE (we'll use issue.location) */}
        <Text style={styles.title}>{issue.location}</Text>

        {/* 3. DESCRIPTION (truncated) */}
        <Text style={styles.description} numberOfLines={2}>
          {issue.description}
        </Text>

        {/* 4. UPVOTES (from issue.upvotes) */}
        <View style={styles.row}>
          <Ionicons
            name="arrow-up-outline"
            size={16}
            color="#1565C0" // Your theme blue
            style={styles.icon}
          />
          <Text style={styles.upvoteText}>{issue.upvotes} upvotes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden", // Ensures image corners are rounded
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#eee", // Placeholder bg color
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    // This is now the location
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    // Added style for description
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  upvoteText: {
    fontSize: 14,
    color: "#1565C0",
    fontWeight: "600",
  },
});
