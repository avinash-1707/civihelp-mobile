import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, ViewProps } from "react-native";
// UPDATED IMPORTS:
import IssueCard from "@/components/IssueCard";
import { Issue, DUMMY_ISSUES } from "@/constants/data";

// --- Types & Data are now imported, so DELETE them from here ---

// This will be the header for our list
const ListHeader = ({ pendingCount }: { pendingCount: number }) => (
  <View style={styles.listHeader}>
    <Text style={styles.subtitle}>
      {pendingCount} {pendingCount === 1 ? "issue needs" : "issues need"} your
      help
    </Text>
  </View>
);

export default function VolunteerHomeScreen() {
  // Filter for only "Pending" issues
  const availableIssues = useMemo(() => {
    // We now import DUMMY_ISSUES
    return DUMMY_ISSUES.filter((issue) => issue.status === "Pending");
  }, [DUMMY_ISSUES]);

  return (
    <View style={styles.container}>
      <FlatList
        data={availableIssues}
        renderItem={({ item }) => <IssueCard issue={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ListHeader pendingCount={availableIssues.length} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No pending issues found. Great job!
          </Text>
        }
      />
    </View>
  );
}

// ... (Styles are unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
