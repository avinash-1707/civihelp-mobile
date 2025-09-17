import React, { useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useVolunteer } from "@/context/VolunteerContext";
import { Issue, DUMMY_ISSUES } from "@/constants/data";
import VolunteerIssueCard from "@/components/VolunteerIssueCard";

// 1. IMPORT THE NEW VOLUNTEER CARD (we will create this in the next step)

// This is the header for the list (from your original file)
const ListHeader = ({ pendingCount }: { pendingCount: number }) => (
  <View style={styles.listHeader}>
    <Text style={styles.subtitle}>
      {pendingCount} {pendingCount === 1 ? "issue needs" : "issues need"} your
      help
    </Text>
  </View>
);

export default function VolunteerHomeScreen() {
  // 2. GET REGISTRATION STATUS AND ROUTER
  const { isRegistered } = useVolunteer();
  const router = useRouter();

  // Add a loading state to prevent flash of content
  const [isLoading, setIsLoading] = useState(true);

  // 3. ADD THE "GATEKEEPER" LOGIC
  useEffect(() => {
    // We wait for the context to be ready
    if (isRegistered === undefined) return;

    if (!isRegistered) {
      // If not registered, push the modal.
      // We use 'push' so it appears on top.
      router.push("/(volunteer)/onboarding-modal");
      // We can set loading to false, as the modal will cover this screen
      setIsLoading(false);
    } else {
      // If registered, show the dashboard
      setIsLoading(false);
    }
  }, [isRegistered, router]); // Re-run if status or router changes

  // This is your existing logic
  const availableIssues = useMemo(() => {
    return DUMMY_ISSUES.filter((issue) => issue.status === "Pending");
  }, [DUMMY_ISSUES]); // Note: DUMMY_ISSUES is constant, so this only runs once.

  // 4. SHOW A LOADER WHILE CHECKING REGISTRATION
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1565C0" />
      </View>
    );
  }

  // 5. RENDER THE DASHBOARD (only if registered)
  return (
    <View style={styles.container}>
      <FlatList
        data={availableIssues}
        // 6. USE THE NEW CARD COMPONENT
        renderItem={({ item }) => <VolunteerIssueCard issue={item} />}
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

// Updated styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  // New style for the loading spinner
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
