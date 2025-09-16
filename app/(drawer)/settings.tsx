import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Reusable Settings Row Component ---
interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isToggle?: boolean; // Is this row a toggle?
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  rightText?: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  label,
  isToggle = false,
  toggleValue = false,
  onToggle,
  onPress,
  rightText,
}) => {
  return (
    <Pressable style={styles.row} onPress={onPress} disabled={isToggle}>
      <Ionicons name={icon} size={24} color="#555" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rightContent}>
        {isToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: "#767577", true: "#2E7D32" }}
            thumbColor={toggleValue ? "#f4f3f4" : "#f4f3f4"}
          />
        )}
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {!isToggle && (
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        )}
      </View>
    </Pressable>
  );
};

// --- Main Screen Component ---
export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);

  const onLanguagePress = () => {
    console.log("Open Language Selection");
  };

  const onPrivacyPress = () => {
    console.log("Open Privacy Policy");
  };

  const onTermsPress = () => {
    console.log("Open Terms of Service");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Appearance Section */}
      <Text style={styles.sectionTitle}>Appearance</Text>
      <View style={styles.section}>
        <SettingsRow
          icon="contrast-outline"
          label="Dark Mode"
          isToggle
          toggleValue={isDark}
          onToggle={setIsDark}
        />
      </View>

      {/* General Section */}
      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.section}>
        <SettingsRow
          icon="language-outline"
          label="Language"
          rightText="English"
          onPress={onLanguagePress}
        />
      </View>

      {/* Legal Section */}
      <Text style={styles.sectionTitle}>Legal & Support</Text>
      <View style={styles.section}>
        <SettingsRow
          icon="shield-checkmark-outline"
          label="Privacy Policy"
          onPress={onPrivacyPress}
        />
        <SettingsRow
          icon="document-text-outline"
          label="Terms of Service"
          onPress={onTermsPress}
        />
      </View>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    textTransform: "uppercase",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  section: {
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  icon: {
    marginRight: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    fontSize: 16,
    color: "#888",
    marginRight: 10,
  },
});
