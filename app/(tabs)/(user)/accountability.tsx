import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Types & Dummy Data for Rankings ---
interface Department {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  resolved: number;
  avgResponseTime: string; // e.g., "48h"
  rating: number; // out of 5
}

const DUMMY_RANKINGS: Department[] = [
  {
    id: "1",
    name: "Waste Management",
    icon: "trash-outline",
    resolved: 142,
    avgResponseTime: "24h",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Roads & Infrastructure",
    icon: "construct-outline",
    resolved: 89,
    avgResponseTime: "72h",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Public Lighting Dept.",
    icon: "bulb-outline",
    resolved: 210,
    avgResponseTime: "18h",
    rating: 3.9,
  },
  {
    id: "4",
    name: "Water Supply Board",
    icon: "water-outline",
    resolved: 65,
    avgResponseTime: "48h",
    rating: 3.5,
  },
];

// --- Reusable List Item Component ---
const DepartmentRow: React.FC<{ item: Department; rank: number }> = ({
  item,
  rank,
}) => (
  <View style={styles.row}>
    <Text style={styles.rank}>#{rank + 1}</Text>
    <Ionicons name={item.icon} size={32} color="#1565C0" style={styles.icon} />
    <View style={styles.info}>
      <Text style={styles.deptName}>{item.name}</Text>
      <Text style={styles.stats}>
        {item.resolved} Resolved | Avg. Response: {item.avgResponseTime}
      </Text>
    </View>
    <View style={styles.ratingBox}>
      <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
      <Ionicons name="star" size={14} color="#FFC107" />
    </View>
  </View>
);

// --- Main Screen Component ---
export default function RankingsScreen() {
  // Sort data by rating
  const sortedData = DUMMY_RANKINGS.sort((a, b) => b.rating - a.rating);

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        renderItem={({ item, index }) => (
          <DepartmentRow item={item} rank={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            Department Rankings (This Month)
          </Text>
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
  listContent: {
    padding: 16,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  row: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    width: 35,
  },
  icon: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  deptName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  stats: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FBC02D",
    marginRight: 4,
  },
});
