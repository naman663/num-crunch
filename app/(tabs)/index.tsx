import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

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

  // Called when user taps "Submit"
  function handleSubmit() {
    // confirm value is wired up
    console.log("Submitted answer: ", answerText);
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
});
