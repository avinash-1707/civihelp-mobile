import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Using icons from your tab layout

export default function OnboardingModal() {
  const router = useRouter();

  const handleRegister = (role: "volunteer" | "thekedaar") => {
    // We navigate to the 'register' screen and pass the
    // selected role as a parameter.
    router.push({
      pathname: "/(tabs)/(volunteer)/register",
      params: { role: role },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Ionicons name="shield-checkmark-outline" size={80} color="#1565C0" />

        <Text style={styles.title}>Join the Team</Text>
        <Text style={styles.subtitle}>
          Register to start resolving civic issues. Are you an individual or a
          contractor?
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.volunteerButton]}
          onPress={() => handleRegister("volunteer")}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Register as a Volunteer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.thekedaarButton]}
          onPress={() => handleRegister("thekedaar")}
        >
          <Ionicons name="hammer-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Register as a Thekedaar</Text>
        </TouchableOpacity>

        {/* Note: We don't provide a "close" button. The user must
          select a role to proceed. This modal will be presented
          by the 'index' screen if the user isn't registered.
        */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  volunteerButton: {
    backgroundColor: "#1565C0", // Your theme blue
  },
  thekedaarButton: {
    backgroundColor: "#E65100", // A distinct color for 'Thekedaar'
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
});
