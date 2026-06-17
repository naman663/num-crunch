// app/useMathSession.ts
import { useMemo, useState } from "react";
import { useGameStats } from "./useGameStats";

// Represents a single multiplication question
export type ArithmeticQuestion = {
  a: number;
  b: number;
  operator: "+" | "-" | "*" | "/";
  questionType: "arithmetic" | "variable";

  // For variable questions only
  variablePos?: "a" | "b";
  result?: number;
  variableAnswer?: number;
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

function getRandomQuestionType(): ArithmeticQuestion["questionType"] {
  const qTypes: ArithmeticQuestion["questionType"][] = ["arithmetic", "variable"];
  
  return qTypes[randInt(0, qTypes.length - 1)];
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
  // Randomly choose question type 
  const questionType = getRandomQuestionType();

  if (questionType === 'variable') {
    return generateVariableQuestion(operator);
  }
  
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
      questionType: "arithmetic",
    };
  }

  // Division
  // result is always a whole number
  if (operator === '/') {
    const denominator = randInt(1, 9);

    const minAnswer = Math.ceil(range.min / denominator);
    const maxAnswer = Math.floor(range.max / denominator);

    const answer = randInt(minAnswer, maxAnswer);
    const numerator = answer * denominator;

    return {
      a: numerator,
      b: denominator,
      operator,
      questionType: "arithmetic",
    };
  }
  
  return {
      a: x,
      b: y,
      operator,
      questionType: "arithmetic",
    };
}

// Generates a variable-solving question using whole-number values from 1–100
function generateVariableQuestion(operator: ArithmeticQuestion["operator"]): ArithmeticQuestion {
  // Randomly decide whether x should be the first number or second number
  const variablePos = randInt(0, 1) === 0 ? "a" : "b";

  // Generate the hidden answer for x
  const variableAnswer = randInt(1, 100);

  // Generate the other visible number
  const otherNumber = randInt(1, 100);

  // Addition: x + b = result OR a + x = result
  if (operator === "+") {
    return {
      a: variablePos === "a" ? variableAnswer : otherNumber,
      b: variablePos === "b" ? variableAnswer : otherNumber,
      operator,
      questionType: "variable",
      variablePos,
      variableAnswer,
      result: variableAnswer + otherNumber,
    };
  }

  // Subtraction: keep values simple, whole-number, and non-negative
  if (operator === "-") {
    if (variablePos == "a") {
      const b = randInt(1, variableAnswer);

      // Case 1: x - b = result
      return {
        a: variableAnswer,
        b,
        operator,
        questionType: "variable",
        variablePos,
        variableAnswer,
        result: variableAnswer - b,
      };
    }

    const a = randInt(variableAnswer, 100);

    // Case 2: a - x = result
    return {
      a,
      b: variableAnswer,
      operator,
      questionType: "variable",
      variablePos,
      variableAnswer,
      result: a - variableAnswer,
    };
  }

  // Multiplication: x * b = result OR a * x = result
  if (operator === "*") {
    return {
      a: variablePos === "a" ? variableAnswer : otherNumber,
      b: variablePos === "b" ? variableAnswer : otherNumber,
      operator,
      questionType: "variable",
      variablePos,
      variableAnswer,
      result: variableAnswer * otherNumber,
    };
  }

  // Division: build equation so var answer and right side res are whole numbers
  // Handle cases of x / b and a / x
  const result = randInt(1, 100);

  if (variablePos === 'a') {
    const b = randInt(1, 9);
    const x = result * b;

    // x / b = result
    return {
      a: x,
      b,
      operator,
      questionType: "variable",
      variablePos,
      variableAnswer: x,
      result,
    };
  }

  // a / x = result
  const x = randInt(1, 9);
  const a = result * x;

  return {
    a,
    b: x,
    operator,
    questionType: "variable",
    variablePos,
    variableAnswer: x,
    result,
  };
}

function getCorrectAnswer(question: ArithmeticQuestion): number {
  // Variable questions 
  if (question.questionType === "variable") {
    return question.variableAnswer ?? 0;
  }
  // Addition
  if (question.operator === "+") {
    return question.a + question.b;
  }
  // Subtraction
  if (question.operator === "-") {
    return question.a - question.b;
  }
  // Multiplication
  if (question.operator === "*") {
    return question.a * question.b;
  }

  // division operator
  return question.a / question.b;
}

function getQuestionText(question: ArithmeticQuestion, displayOperator: string): string {
  // normal arith. question
  if (question.questionType === "arithmetic") {
    return `${question.a} ${displayOperator} ${question.b}`;
  }

  // Variable question with x on left side (ex: x + 8 = 23)
  if (question.variablePos === "a") {
    return `x ${displayOperator} ${question.b} = ${question.result}`;
  }

  // x on right side
  return `${question.a} ${displayOperator} x = ${question.result}`;
}

function getDisplayOperator(operator: ArithmeticQuestion["operator"]): string {
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
    questionText: getQuestionText(question, getDisplayOperator(question.operator)),
    displayOperator: getDisplayOperator(question.operator),
  };
}
