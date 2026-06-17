// app/index.web.tsx
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    showMilestoneModal,
    milestoneCorrectCount,
    closeMilestoneModal,
    displayOperator,
    questionText,
  } = useMathSession();

  return (
    // Use a plain View to force a dark background regardless of theme behavior
    <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Num Crunch</Text>
        </View>
        {/* Main centered content */}
        <View style={styles.content}>
          {/* Big centered multiplication question */}
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>
              {questionText}
            </Text>
          </View>

          {/* Input + submit button on the same row */}
          <View style={styles.answerRow}>
            <TextInput
              style={styles.input}
              value={answerText}
              onChangeText={setAnswerText}
              placeholder="Type your answer"
              placeholderTextColor="#888"
              keyboardType="decimal-pad"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>

        {/* Incorrect-answer Modal (web will render this as an overlay) */}
        <Modal
          visible={isErrorVisible}
          transparent
          animationType="fade"
          onRequestClose={closeError}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalMessage}>
                {errorMsg}
              </Text>

              <Pressable style={styles.modalCloseButton} onPress={closeError}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {showMilestoneModal && (
        <div
            style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            zIndex: 9999,
            }}
            onClick={closeMilestoneModal}
        >
            <div
            style={{
                width: "100%",
                maxWidth: 420,
                backgroundColor: "white",
                borderRadius: 16,
                padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
            >
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                Nice work! 🎉
            </div>

            <div style={{ fontSize: 16, marginBottom: 8 }}>
                You’ve answered {milestoneCorrectCount} correct.
            </div>

            <button
                onClick={closeMilestoneModal}
                style={{
                float: "right",
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                backgroundColor: "#111",
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                }}
            >
                Continue
            </button>
            </div>
        </div>
        )}

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
    flexWrap: "wrap",
    justifyContent: "center",
  },

  // Input field
  input: {
    flex: 1,
    minWidth: 260,
    maxWidth: 700,
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    padding: 12,
    color: "white",
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

  // Submit button area
  submitButton: {
  backgroundColor: "#ffffff",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  marginLeft: 10,
},

// Submit button text
submitButtonText: {
  color: "#000000",
  fontWeight: "600",
},
});
