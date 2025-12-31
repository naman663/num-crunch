// app/useMathSession.ts
import { useMemo, useState } from "react";

// Represents a single multiplication question
export type MultiplicationQuestion = {
  a: number;
  b: number;
};

// Returns a random integer between min and max (inclusive)
function randInt(min: number, max: number): number {
  const range = max - min + 1;
  const offset = Math.floor(Math.random() * range);
  return min + offset;
}

// Generates a random multiplication question: 1–12 × 1–12
function generateQuestion(): MultiplicationQuestion {
  const a = randInt(1, 12);
  const b = randInt(1, 12);
  return { a, b };
}

// Shared logic hook: UI-independent math session state + submit behavior
export function useMathSession() {
  // Store the current question
  const [question, setQuestion] = useState<MultiplicationQuestion>(() => generateQuestion());

  // Store the user's input as a string (TextInput is string-based)
  const [answerText, setAnswerText] = useState<string>("");

  // Control the incorrect-answer modal
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Precompute correct answer for current question
  const correctAnswer = useMemo(() => question.a * question.b, [question]);

  // Called when user presses Submit
  function handleSubmit() {
    // Save raw input before clearing (we want input cleared for retry)
    const raw = answerText.trim();

    // Clear the input immediately so user can type again right away
    setAnswerText("");

    // Validate non-empty numeric input
    if (raw.length === 0) {
      setErrorMsg("Enter an answer.");
      setIsErrorVisible(true);
      return;
    }

    const userAnswer = Number(raw);
    if (Number.isNaN(userAnswer)) {
      setErrorMsg("Please enter a valid number.");
      setIsErrorVisible(true);
      return;
    }

    // Correct: silently advance to next question (no popup)
    if (userAnswer === correctAnswer) {
      setQuestion(generateQuestion());
      return;
    }

    // Incorrect: show modal and keep the same question
    setErrorMsg("Incorrect — try again.");
    setIsErrorVisible(true);
  }

  // Close the incorrect modal
  function closeError() {
    setIsErrorVisible(false);
  }

  return {
    question,
    answerText,
    setAnswerText,
    handleSubmit,
    isErrorVisible,
    errorMsg,
    closeError,
  };
}
