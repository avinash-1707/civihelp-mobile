import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Dummy User Data ---
const DUMMY_USER = {
  name: "Rohan Gupta",
  email: "rohan.gupta@example.com",
  phone: "+91 98765 43210",
};

// --- Reusable Info Row Component ---
interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={24} color="#1565C0" style={styles.infoIcon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// --- Main Screen Component ---
export default function ProfileScreen() {
  const onEditProfile = () => {
    // In a real app, this would navigate to an edit screen
    // e.g., router.push('/(drawer)/profile/edit');
    console.log("Navigate to Edit Profile");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={120} color="#1565C0" />
        <Text style={styles.name}>{DUMMY_USER.name}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <InfoRow icon="mail-outline" label="Email" value={DUMMY_USER.email} />
        <InfoRow icon="call-outline" label="Phone" value={DUMMY_USER.phone} />
      </View>

      {/* Edit Button */}
      <Pressable style={styles.editButton} onPress={onEditProfile}>
        <Ionicons name="pencil-outline" size={18} color="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  infoSection: {
    marginTop: 20,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIcon: {
    marginRight: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
  editButton: {
    backgroundColor: "#1565C0", // Your theme blue
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
