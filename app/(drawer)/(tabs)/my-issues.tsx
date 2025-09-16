import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Types & Dummy Data for this screen ---
type IssueStatus = "Pending" | "In Progress" | "Resolved";
type SortFilter = IssueStatus | "All";

interface MyIssue {
  id: string;
  location: string;
  imageUrl: string;
  status: IssueStatus;
  description: string;
  date: Date; // Added date
}

// Helper to get status color
const getStatusColor = (status: IssueStatus) => {
  switch (status) {
    case "Pending":
      return "#D32F2F";
    case "In Progress":
      return "#1565C0";
    case "Resolved":
      return "#2E7D32";
    default:
      return "#888";
  }
};

const DUMMY_MY_ISSUES: MyIssue[] = [
  {
    id: "1",
    location: "Sector 21, Gurgaon",
    imageUrl: "https://picsum.photos/seed/pothole/200/200",
    status: "Pending",
    description: "Large pothole on main road.",
    date: new Date("2025-09-16T09:30:00"),
  },
  {
    id: "2",
    location: "Sushant Lok, Phase 1",
    imageUrl: "https://picsum.photos/seed/garbage/200/200",
    status: "Resolved",
    description: "Garbage overflow from bin.",
    date: new Date("2025-09-14T14:15:00"),
  },
  {
    id: "3",
    location: "Near MG Road Metro",
    imageUrl: "https://picsum.photos/seed/light/200/200",
    status: "In Progress",
    description: "Streetlight not working.",
    date: new Date("2025-09-15T18:00:00"),
  },
];

// --- Reusable List Item Component ---
const MyIssueListItem: React.FC<{ item: MyIssue }> = ({ item }) => (
  <View style={styles.listItem}>
    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
    <View style={styles.itemContent}>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemLocationRow}>
        <Ionicons name="location-outline" size={14} color="#555" />
        <Text style={styles.itemLocation}>{item.location}</Text>
      </View>
      <Text style={styles.itemDate}>
        Reported on: {item.date.toLocaleDateString()}
      </Text>
    </View>
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: getStatusColor(item.status) },
      ]}
    >
      <Text style={styles.statusText}>{item.status}</Text>
    </View>
  </View>
);

// --- Main Screen Component ---
export default function MyIssuesScreen() {
  const [filter, setFilter] = useState<SortFilter>("All");

  // useMemo will re-sort the list only when the filter or data changes
  const sortedIssues = useMemo(() => {
    if (filter === "All") {
      return DUMMY_MY_ISSUES;
    }
    return DUMMY_MY_ISSUES.filter((issue) => issue.status === filter);
  }, [filter]);

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {(["All", "Pending", "In Progress", "Resolved"] as SortFilter[]).map(
          (f) => (
            <Pressable
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* List of Issues */}
      <FlatList
        data={sortedIssues}
        renderItem={({ item }) => <MyIssueListItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No issues found for this filter.</Text>
        }
      />
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  filterButtonActive: {
    backgroundColor: "#1565C0", // Your blue color
  },
  filterText: {
    color: "#333",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    padding: 16,
  },
  listItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#888",
  },
  statusBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    elevation: 3,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
