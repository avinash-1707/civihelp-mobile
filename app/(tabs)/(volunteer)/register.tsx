import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVolunteer } from "@/context/VolunteerContext"; // Import our context hook

export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const { registerVolunteer } = useVolunteer();

  // State for the form fields
  const [name, setName] = useState("");
  // --- NEW STATE FOR KYC ---
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  // -------------------------
  const [qualifications, setQualifications] = useState("");
  const [certifications, setCertifications] = useState("");

  const handleSubmit = () => {
    // --- UPDATED VALIDATION ---
    if (
      !name.trim() ||
      !aadhaar.trim() ||
      !pan.trim() ||
      !qualifications.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill out all required fields (Name, Aadhaar, PAN, and Qualifications)."
      );
      return;
    }

    // Regex for basic validation
    const aadhaarRegex = /^\d{12}$/; // 12 digits
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // 5 letters, 4 numbers, 1 letter

    if (!aadhaarRegex.test(aadhaar)) {
      Alert.alert(
        "Invalid Aadhaar",
        "Aadhaar Card number must be exactly 12 digits."
      );
      return;
    }

    if (!panRegex.test(pan.toUpperCase())) {
      Alert.alert(
        "Invalid PAN",
        "Please enter a valid 10-character PAN number (e.g., ABCDE1234F)."
      );
      return;
    }
    // --- END UPDATED VALIDATION ---

    // Prepare the data to "submit"
    const registrationDetails = {
      role,
      name,
      // --- ADD NEW DATA ---
      aadhaar: aadhaar,
      pan: pan.toUpperCase(), // Store in uppercase
      // --------------------
      qualifications,
      certifications,
    };

    // Call the function from our context
    registerVolunteer(registrationDetails);

    // Navigate to the dashboard
    router.replace("/(volunteer)/");
  };

  const title = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Register as {title}</Text>
        <Text style={styles.subtitle}>
          Please provide your details to get started.
        </Text>

        {/* --- FULL NAME (Unchanged) --- */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        {/* --- AADHAAR CARD (New) --- */}
        <Text style={styles.label}>Aadhaar Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="12-digit Aadhaar Number"
          value={aadhaar}
          onChangeText={setAadhaar}
          keyboardType="numeric"
          maxLength={12}
          placeholderTextColor="#999"
        />

        {/* --- PAN CARD (New) --- */}
        <Text style={styles.label}>PAN Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="ABCDE1234F"
          value={pan}
          // Automatically convert to uppercase as the user types
          onChangeText={(text) => setPan(text.toUpperCase())}
          autoCapitalize="characters"
          maxLength={10}
          placeholderTextColor="#999"
        />

        {/* --- QUALIFICATIONS (Unchanged) --- */}
        <Text style={styles.label}>
          {role === "thekedaar"
            ? "Company / Expertise"
            : "Your Skills / Qualifications"}
        </Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder={
            role === "thekedaar"
              ? "e.g., ABC Contractors, 5 years in road repair"
              : "e.g., Licensed plumber, general construction, painting"
          }
          value={qualifications}
          onChangeText={setQualifications}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        {/* --- CERTIFICATIONS (Unchanged) --- */}
        <Text style={styles.label}>Certifications or Licenses*</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List any relevant certifications"
          value={certifications}
          onChangeText={setCertifications}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Registration</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- STYLES (Unchanged) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#f0f2f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top", // for Android
    paddingTop: 12,
  },
  button: {
    backgroundColor: "#1565C0", // Your theme blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
