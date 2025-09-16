import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking, // To open external links
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Reusable FAQ Item (Accordion) ---
interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.faqItem}>
      <Pressable
        style={styles.faqQuestionRow}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons
          name={isOpen ? "chevron-down-outline" : "chevron-forward-outline"}
          size={20}
          color="#1565C0"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

// --- Dummy Data for FAQs ---
const DUMMY_FAQS: FaqItemProps[] = [
  {
    question: "How do I report an issue?",
    answer:
      'Tap the "Report Problem" button on the home screen or in the sidebar menu. Fill out the form with a photo, location, and description, then tap "Submit".',
  },
  {
    question: "How are my Civic Points calculated?",
    answer:
      'You earn points for various activities, including reporting new issues, confirming existing ones, and when your reported issues get resolved. Check the "Rewards" screen for more details.',
  },
  {
    question:
      'What do the "Pending", "In Progress", and "Resolved" statuses mean?',
    answer:
      '"Pending" means the issue has been reported but not yet reviewed. "In Progress" means a civic body has acknowledged the issue and is working on it. "Resolved" means the issue has been fixed.',
  },
];

// --- Main Screen Component ---
export default function HelpScreen() {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "We couldn't open this link.");
    }
  };

  // --- Contact Handlers ---
  const onCall = () => {
    openLink("tel:+911234567890"); // Dummy phone number
  };
  const onEmail = () => {
    openLink("mailto:support@civihelp.app?subject=Support Request");
  };
  const onWhatsApp = () => {
    openLink("https://wa.me/911234567890"); // Dummy WhatsApp number
  };

  return (
    <ScrollView style={styles.container}>
      {/* Contact Section */}
      <Text style={styles.sectionTitle}>Contact Support</Text>
      <View style={styles.contactContainer}>
        <Pressable style={styles.contactButton} onPress={onCall}>
          <Ionicons name="call-outline" size={24} color="#1565C0" />
          <Text style={styles.contactText}>Call Helpline</Text>
        </Pressable>
        <Pressable style={styles.contactButton} onPress={onEmail}>
          <Ionicons name="mail-outline" size={24} color="#1565C0" />
          <Text style={styles.contactText}>Email Support</Text>
        </Pressable>
        <Pressable style={styles.contactButton} onPress={onWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          <Text style={styles.contactText}>WhatsApp Bot</Text>
        </Pressable>
      </View>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <View style={styles.faqContainer}>
        {DUMMY_FAQS.map((faq) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  contactButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: "30%", // Approx 1/3 width
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 8,
  },
  faqContainer: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    borderRadius: 8,
    overflow: "hidden",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#f9f9f9",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
