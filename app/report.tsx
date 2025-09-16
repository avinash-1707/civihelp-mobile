import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function ReportScreen() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  // --- Location Handling ---
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access location was denied."
        );
        setLocationLoading(false);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(loc.coords);

        if (address && address[0]) {
          const { street, city, region, postalCode } = address[0];
          setLocation(
            `${street || ""}, ${city || ""}, ${region || ""} ${
              postalCode || ""
            }`
          );
        } else {
          setLocation("Could not find address");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not fetch location.");
        setLocation("Error fetching location");
      }
      setLocationLoading(false);
    })();
  }, []);

  // --- Image Picker Handlers ---
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Permission to access camera was denied."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // --- Form Submit ---
  const handleSubmit = async () => {
    if (!description || !location) {
      Alert.alert(
        "Missing Info",
        "Please fill in the description and location."
      );
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting Report:", { imageUri, description, location });
    // ---
    // In a real app, you would upload the image and POST the data to your API here
    // ---

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    Alert.alert("Success", "Your issue has been reported!");
    router.back(); // Dismiss the modal
  };

  return (
    <>
      {/* This file is a modal, so we get a Stack header by default */}
      <Stack.Screen options={{ title: "Report a New Problem" }} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Image Picker Section */}
        <Text style={styles.label}>📸 Add Photo</Text>
        <View style={styles.imagePickerContainer}>
          <Pressable style={styles.imageButton} onPress={pickImage}>
            <Ionicons name="images-outline" size={24} color="#1565C0" />
            <Text style={styles.imageButtonText}>From Gallery</Text>
          </Pressable>
          <Pressable style={styles.imageButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={24} color="#1565C0" />
            <Text style={styles.imageButtonText}>Take Photo</Text>
          </Pressable>
        </View>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        {/* Location Section */}
        <Text style={styles.label}>📍 Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder={
            locationLoading
              ? "Fetching location..."
              : "e.g., Sector 21, Gurgaon"
          }
          editable={!locationLoading}
        />

        {/* Description Section */}
        <Text style={styles.label}>📝 Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the problem in detail..."
          multiline
          numberOfLines={6}
        />

        {/* Submit Button */}
        <Pressable
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  imageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  imageButtonText: {
    color: "#1565C0",
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#eee",
  },
  input: {
    backgroundColor: "#f0f2f5",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#2E7D32", // Your green color
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#aaa",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
