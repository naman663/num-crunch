import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput } from 'react-native';

// Returns random integer between min and max (inclusive)
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Represents a single multiplication question
type MultiplicationQuestion = {
  a: number;
  b: number;
};

// Generates random multiplication question with numbers 1-12 
function generateQuestion(): MultiplicationQuestion {
  // Pick first and second number
  const a = randInt(1, 12);
  const b = randInt(1, 12);

  return {a, b};
}

export default function HomeScreen() {
  const [question, setQuestion] = useState<MultiplicationQuestion>(() => generateQuestion()); // Stores mult. ques in state
  const [answerText, setAnswerText] = useState<string>(""); // Stores user answer
  // stores error message (user must get correct answer to move on)
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);

  // Called when user taps "Submit"
  function handleSubmit() {
    // Convert input string to number
    const userAnswer = Number(answerText);

    // If empty input or incorrect answer / format, show error message
    if (answerText.trim() === "" || Number.isNaN(userAnswer)) {
      setErrorMsg("Numbers only");
      setIsErrorModalVisible(true);

      // reset answer field
      setAnswerText("");
      return;
    }

    // Compute correct answer
    const correctAnswer = question.a * question.b;

    // Move to next random question if correct, else show error message
    if (userAnswer === correctAnswer) {
      setQuestion(generateQuestion()); 
      setAnswerText("");
      return;

    } else {
      setErrorMsg("Incorrect - try again");
      setIsErrorModalVisible(true);
      setAnswerText("");
    }
  }

  return (
  <ParallaxScrollView 
    headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    headerImage={<></>}
  >
    <ThemedView style={styles.titleContainer}>
      {/* Title */}
      <ThemedText type="title">Num Crunch</ThemedText>
      {/* Multiplication Question */}
      <ThemedText type="subtitle"> {question.a} x {question.b}</ThemedText>
      {/* Answer Input */}
      <TextInput
        style={styles.input}
        value={answerText}
        onChangeText={setAnswerText}
        placeholder='Type your answer'
        keyboardType='number-pad'
      />
      {/* Submit button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <ThemedText type="defaultSemiBold"> Submit </ThemedText>
      </Pressable>
      {/* Incorrect-answer / error modal */}
      <Modal
        visible={isErrorModalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setIsErrorModalVisible(false)}
      >
        {/* Dark overlay behind modal */}
        <ThemedView style={styles.modalOverlay}>
          {/* Modal context box */}
          <ThemedView style={styles.modalCard}>
            <ThemedText type="defaultSemiBold">{errorMsg}</ThemedText>
          {/* Modal close button */}
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setIsErrorModalVisible(false)}
            >
              <ThemedText type="defaultSemiBold"> Close </ThemedText>
            </Pressable>

          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  </ParallaxScrollView>
);

}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
    input: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    width: "90%",
    color: "white",
  },
  button: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Semi-transparent overlay
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalCard: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },
  modalCloseButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
});
