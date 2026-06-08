// app/useMathSession.ts
import { useMemo, useState } from "react";
import { useGameStats } from "./useGameStats";

// Represents a single multiplication question
export type ArithmeticQuestion = {
  a: number;
  b: number;
  operator: "+" | "-" | "*" | "/";
};

// Represents difficulty level selected for session
export type Difficulty = "easy" | "medium" | "hard";

// Returns max number allowed for current difficulty 
function getNumberRange(operator: ArithmeticQuestion["operator"], difficulty: Difficulty): {min: number, max: number} {
  // Addition and subtraction ranges
  // easy: return numbers between 1-12
  // medium: return numbers between 12-100
  // hard: return numbers between 100-1000
  if (operator === '+' || operator === '-') {
    if (difficulty === 'easy') {
      return {min: 1, max: 12};
    }
    if (difficulty === 'medium') {
      return {min: 12, max: 100};
    }
    return {min: 100, max: 1000};
  }

  // Multiplication ranges
  // easy: return numbers between 1-12
  // medium: return numbers between 12-50
  // hard: return numbers between 50-100
  if (operator === '*') {
    if (difficulty === 'easy') return {min: 1, max: 12};
    if (difficulty === 'medium') return {min: 12, max: 50};
    return {min: 50, max: 100};
  }

  // Division numerator ranges (denominator should be 1-9)
  // easy: return numbers between 1-12
  // medium: return numbers between 12-100
  // hard: return numbers between 100-1000
  if (difficulty === 'easy') return {min: 1, max: 12};
  if (difficulty === 'medium') return {min: 12, max: 100};
  return {min: 100, max: 1000};
}

type ArithmeticOperator = "+" | "-" | "*" | "/";

// Randomly selects arith. operator
function getRandomOperator(): ArithmeticOperator {
  const operators: ArithmeticOperator[] = ["+", "-", "*", "/"];

  return operators[randInt(0, operators.length - 1)];
}

// Returns a random integer between min and max (inclusive)
function randInt(min: number, max: number): number {
  const range = max - min + 1;
  const offset = Math.floor(Math.random() * range);
  return min + offset;
}

// Generates a random multiplication question: 1–12 × 1–12
function generateQuestion(difficulty: Difficulty): ArithmeticQuestion {
  // Randomly choose operator
  const operator = getRandomOperator();
  // Get number ranges
  const range = getNumberRange(operator, difficulty);

  const x = randInt(range.min, range.max);
  const y = randInt(range.min, range.max);

  // Subtraction expressions must not be negative
  if (operator === "-") {
    return {
      a: Math.max(x, y),
      b: Math.min(x, y),
      operator,
    };
  }

  // Division
  if (operator === '/') {
    return {
      a: x,
      b: randInt(1,9),
      operator,
    };
  }
  
  return {
      a: x,
      b: y,
      operator,
    };
}

function getCorrectAnswer(question: ArithmeticQuestion): number {
  // Addition
  if (question.operator === "+") {
    return question.a + question.b;
  }

  if (question.operator === "-") {
    return question.a - question.b;
  }

  if (question.operator === "*") {
    return question.a * question.b;
  }

  // division operator
  return question.a / question.b;
}

function getDisplayOperator(operator: ArithmeticQuestion["operator"]): string {
  if (operator === "*") {
    return "x";
  }

  if (operator === "/") {
    return "÷";
  }

  return operator;
}

function getRandomDifficulty(): Difficulty {
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  return difficulties[randInt(0, difficulties.length - 1)];
}

// Round to two decimals
function roundToTwoDecimals(value: number): number {
  return Number(value.toFixed(2));
}

// Shared logic hook: UI-independent math session state + submit behavior
export function useMathSession() {
  const { stats, total, accuracy, recordCorrect, recordIncorrect, resetStats } = useGameStats();

  // Store the current question
  const [question, setQuestion] = useState<ArithmeticQuestion>(() => generateQuestion(getRandomDifficulty()));

  // Display stats at increments
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [milestoneCorrectCount, setMilestoneCorrectCount] = useState<number | null>(null);

  function closeMilestoneModal() {
    setShowMilestoneModal(false);
    setMilestoneCorrectCount(null);
  }



  // Store the user's input as a string (TextInput is string-based)
  const [answerText, setAnswerText] = useState<string>("");

  // Control the incorrect-answer modal
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Precompute correct answer for current question
  const correctAnswer = useMemo(() => roundToTwoDecimals(getCorrectAnswer(question)), [question]);

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

    const userAnswer = roundToTwoDecimals(Number(raw));
    if (Number.isNaN(userAnswer)) {
      setErrorMsg("Please enter a valid number.");
      setIsErrorVisible(true);
      return;
    }

    // Correct: silently advance to next question (no popup)
    if (userAnswer === correctAnswer) {
      const nextCorrect = stats.correct + 1; // increment streak

      // Congratulate user on streak of multiple of 5
      if (nextCorrect % 5 === 0) {
        setMilestoneCorrectCount(nextCorrect);
        setShowMilestoneModal(true);
      }

      recordCorrect();
      setQuestion(generateQuestion(getRandomDifficulty()));
      return;
    }

    // Incorrect: show modal and keep the same question
    recordIncorrect();
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
    stats,
    total,
    accuracy,
    resetStats,
    showMilestoneModal, 
    milestoneCorrectCount,
    closeMilestoneModal,
    displayOperator: getDisplayOperator(question.operator),
  };
}
