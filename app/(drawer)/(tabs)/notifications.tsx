import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// --- Types for Notifications ---
type NotificationType = "resolved" | "update" | "announcement";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string; // Optional: to link to an issue
}

// --- Dummy Data ---
const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "resolved",
    title: "Issue Resolved!",
    message:
      'Your report about the "Large pothole on main road" has been resolved.',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    link: "/(drawer)/(tabs)/my-issues",
  },
  {
    id: "2",
    type: "update",
    title: 'Update on "Streetlight not working"',
    message: "A maintenance team has been assigned to your issue.",
    date: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    read: false,
    link: "/(drawer)/(tabs)/my-issues",
  },
  {
    id: "3",
    type: "announcement",
    title: "Civic Announcement",
    message:
      "Waste collection schedule changed for Sector 21. Click to see details.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: "4",
    type: "resolved",
    title: "Issue Resolved!",
    message: 'Your report about "Garbage overflow" has been resolved.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
    link: "/(drawer)/(tabs)/my-issues",
  },
];

// --- Helper to get Icon and Color ---
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "resolved":
      return { name: "checkmark-circle" as const, color: "#2E7D32" }; // Green
    case "update":
      return { name: "alert-circle" as const, color: "#1565C0" }; // Blue
    case "announcement":
      return { name: "megaphone" as const, color: "#EF6C00" }; // Orange
  }
};

// --- Time Ago Helper ---
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

// --- Reusable List Item Component ---
const NotificationItem: React.FC<{ item: Notification }> = ({ item }) => {
  const router = useRouter();
  const icon = getNotificationIcon(item.type);

  const onPress = () => {
    // Here you would also mark the notification as 'read'
    console.log("Tapped notification:", item.id);
    if (item.link) {
      router.push(item.link as any);
    }
  };

  return (
    <Pressable
      style={[styles.listItem, !item.read && styles.listItemUnread]}
      onPress={onPress}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: icon.color + "20" }]}
      >
        <Ionicons name={icon.name} size={28} color={icon.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>
        <Text style={styles.itemDate}>{timeAgo(item.date)}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </Pressable>
  );
};

// --- Main Screen Component ---
export default function NotificationsScreen() {
  // In a real app, you'd fetch this data and use useState
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => <NotificationItem item={item} />}
      keyExtractor={(item) => item.id}
      style={styles.container}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No new notifications.</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  listItemUnread: {
    backgroundColor: "#f0f8ff", // A light blue for unread
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemMessage: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  itemDate: {
    fontSize: 12,
    color: "#888",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1565C0", // Your theme blue
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 82, // Aligns with text
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
