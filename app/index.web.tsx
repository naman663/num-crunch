// app/index.web.tsx
import React from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { useMathSession } from "./useMathSession";

// Web-specific Home screen UI (keeps the "computer view" look)
export default function HomeScreenWeb() {
  // Shared math + modal logic (same behavior across platforms)
  const {
    question,
    answerText,
    setAnswerText,
    handleSubmit,
    isErrorVisible,
    errorMsg,
    closeError,
  } = useMathSession();

  return (
    // Use a plain View to force a dark background regardless of theme behavior
    <View style={styles.screen}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        // Put the title in the blue header area
        headerImage={
          <ThemedView style={styles.header}>
            <ThemedText style={styles.headerTitle}>Num Crunch</ThemedText>
          </ThemedView>
        }
      >
        {/* Main centered content */}
        <ThemedView style={styles.content}>
          {/* Big centered multiplication question */}
          <ThemedView style={styles.questionRow}>
            <ThemedText style={styles.questionText}>
              {question.a} × {question.b}
            </ThemedText>
          </ThemedView>

          {/* Input + submit button on the same row */}
          <ThemedView style={styles.answerRow}>
            <TextInput
              style={styles.input}
              value={answerText}
              onChangeText={setAnswerText}
              placeholder="Type your answer"
              placeholderTextColor="#888"
              keyboardType="number-pad"
              onSubmitEditing={handleSubmit}
            />
          </ThemedView>
        </ThemedView>

        {/* Incorrect-answer Modal (web will render this as an overlay) */}
        <Modal
          visible={isErrorVisible}
          transparent
          animationType="fade"
          onRequestClose={closeError}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <ThemedText type="defaultSemiBold" style={styles.modalMessage}>
                {errorMsg}
              </ThemedText>

              <Pressable style={styles.modalCloseButton} onPress={closeError}>
                <ThemedText type="defaultSemiBold">Close</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Full-screen dark background (matches your desired black computer view)
  screen: {
    flex: 1,
    backgroundColor: "#0B0F14",
  },

  // Header container placed inside Parallax headerImage
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  // Title text in the blue header
  headerTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
  },

  // Centers content in the main area
  content: {
    flexGrow: 1, // important when inside scroll content
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  // One-line multiplication question
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  // Large question
  questionText: {
    fontSize: 56,
    fontWeight: "800",
    color: "white",
  },

  // Input + button row
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 900,
    gap: 12,
  },

  // Input field
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    padding: 12,
    color: "white",
    backgroundColor: "#0B0F14",
  },

  // Submit button
  button: {
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: "#0B0F14",
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 18,
  },

  // Modal card container
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#0B0F14",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2F35",
    padding: 18,
    gap: 14,
  },

  // Modal message text
  modalMessage: {
    textAlign: "center",
    color: "white",
  },

  // Close button inside modal
  modalCloseButton: {
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
});
