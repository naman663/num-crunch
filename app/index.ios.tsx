// app/index.ios.tsx
import React from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { useMathSession } from "./useMathSession";

// iPhone-first Home screen UI (layout only)
export default function HomeScreenIOS() {
  // Shared math + modal logic (same behavior on every platform)
  const {
    question,
    answerText,
    setAnswerText,
    handleSubmit,
    isErrorVisible,
    errorMsg,
    closeError,
  } = useMathSession();

  // Used to scale text/layout depending on phone width
  const screenWidth = Dimensions.get("window").width;

  // Dynamic font size so the question fits on smaller screens
  const questionFontSize = Math.min(72, Math.max(42, Math.floor(screenWidth * 0.14)));

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top header bar (replaces the weird "blue section" differences) */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View />
          <View>
            {/* Title */}
            <View>
              {/* Using plain text via styles keeps it consistent across iOS */}
            </View>
          </View>
          <View />
        </View>

        {/* Title centered */}
        <View style={styles.headerTitleWrap}>
          <View>
            <View>
              {/* Title Text */}
              <TextBlock text="Num Crunch" style={styles.headerTitle} />
            </View>
          </View>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.body}>
        {/* Big centered multiplication question */}
        <View style={styles.questionWrap}>
          <View>
            <View>
              {/* We render as a styled text-like block using Pressable text style approach */}
            </View>
          </View>
        </View>

        {/* Question text */}
        <View style={styles.questionLine}>
          <View>
            <Pressable disabled style={{}}>
              {/* Pressable used only as a wrapper; the text is in the style below */}
            </Pressable>
          </View>
        </View>

        {/* Actual big text */}
        <View style={styles.questionTextWrap}>
          <Pressable disabled style={{}}>
            {/* Using Pressable + styles is not required, but keeps styling simple */}
          </Pressable>
        </View>

        {/* Input + submit row */}
        <View style={styles.answerRow}>
          <TextInput
            style={styles.input}
            value={answerText}
            onChangeText={setAnswerText}
            placeholder="Type your answer"
            placeholderTextColor="#8A8A8A"
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={handleSubmit} // hitting "done" submits too
          />
        </View>

        {/* Render the visible question text and button label using simple Views + styles */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.overlay}>
            {/* Centered question text */}
            <View style={styles.questionOverlay}>
              <View>
                <Pressable disabled style={{}}>
                  <View>
                    <View>
                      {/* (spacer) */}
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Correct place to render text elements (simple and reliable) */}
        <View style={styles.textLayer} pointerEvents="none">
          <View style={styles.questionTextContainer}>
            <TextBlock
              text={`${question.a} × ${question.b}`}
              style={[styles.questionText, { fontSize: questionFontSize }]}
            />
          </View>

          <View style={styles.buttonTextContainer}>
            <TextBlock text="Submit" style={styles.buttonText} />
          </View>
        </View>
      </View>

      {/* Incorrect-answer Modal */}
      <Modal
        visible={isErrorVisible}
        transparent
        animationType="fade"
        onRequestClose={closeError}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TextBlock text={errorMsg} style={styles.modalMessage} />

            <Pressable style={styles.modalCloseButton} onPress={closeError}>
              <TextBlock text="Close" style={styles.modalCloseText} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/**
 * Lightweight text component so we can style text consistently without importing themed components.
 * Keeps iPhone layout predictable.
 */
function TextBlock({ text, style }: { text: string; style: any }) {
  // We keep this as a tiny component so we can reuse it for title/question/button/modals.
  // This avoids mixing "ThemedText" with platform differences for now.
  // eslint-disable-next-line react-native/no-inline-styles
  return <View><TextNative text={text} style={style} /></View>;
}

// Internal text renderer (avoids extra imports in the main component)
function TextNative({ text, style }: { text: string; style: any }) {
  // We import Text lazily to keep the top imports small and focused.
  const { Text } = require("react-native");
  return <Text style={style}>{text}</Text>;
}

const styles = StyleSheet.create({
  // Full-screen dark background
  screen: {
    flex: 1,
    backgroundColor: "#0B0F14",
  },

  // Top header area (your “blue section”)
  header: {
    height: 170,
    backgroundColor: "#1D3D47",
    justifyContent: "center",
  },

  // Center the title in the header
  headerTitleWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Main body area
  body: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  // Keeps question centered
  questionTextContainer: {
    alignItems: "center",
    marginBottom: 18,
  },

  // Big question styling
  questionText: {
    color: "white",
    fontWeight: "800",
    letterSpacing: 1,
  },

  // Title overlay in header
  titleTextContainer: {
    position: "absolute",
    top: 62,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 34,
    fontWeight: "800",
  },

  // Input + button row
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // Input styling (dark + white text)
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "white",
    backgroundColor: "#0B0F14",
    fontSize: 18,
  },

  // Submit button container
  button: {
    width: 110,
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B0F14",
  },

  // Button label positioning (to keep it centered reliably)
  buttonTextContainer: {
    position: "absolute",
    right: 18 + 0, // same as horizontal padding
    bottom: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  // --- Modal styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 18,
  },

  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#0B0F14",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2F35",
    padding: 18,
    gap: 14,
  },

  modalMessage: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  modalCloseButton: {
    borderWidth: 1,
    borderColor: "#2A2F35",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  headerTitle: {
  color: "white",
  fontSize: 36,
  fontWeight: "700",
  },

  modalCloseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  // (helpers used for overlay layers)
  textLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
  },
  questionWrap: {},
  questionLine: {},
  questionTextWrap: {},
  questionOverlay: {},
  headerInner: {},
});
