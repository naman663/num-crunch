# Num Crunch

Num Crunch is a lightweight mental-math training application designed for fast arithmetic practice across addition, subtraction, multiplication, and division.

Questions are continuously generated with randomized operations and randomized difficulty levels to create a varied training experience. The application is optimized for iPhone and Web usage and is deployed through Vercel for browser-based access.

## Current Functionality

- Random arithmetic question generation
  - Addition
  - Subtraction
  - Multiplication
  - Division

- Variable solving
  - x + a = b
  - x - a = b
  - a - x = b
  - x × a = b
  - x ÷ a = b
  - a ÷ x = b

## Difficulty System

Each question is assigned a random difficulty level:

Easy
Medium
Hard

### Addition / Subtraction

Easy: 1–12

Medium: 12–100

Hard: 100–1000

### Multiplication

Easy: 1–12

Medium: 12–50

Hard: 50–100

### Division

Numerator:

Easy: 1–12

Medium: 12–100

Hard: 100–1000

Denominator:

1–9

## Gameplay Features

- Automatic question generation

- Automatic answer validation

- Incorrect-answer modal feedback

- Milestone modal every 5 correct answers

- Running session statistics
  - Correct answers
  - Incorrect answers
  - Accuracy %

- Separate iOS and Web layouts, mobile web dev. through Vercel

## Tech Stack
- React Native
- Expo
- TypeScript
- Vercel

## Running the App Locally - bash
npm install
npx expo start

## Key Functions

### randInt(min, max)
Generates a random integer between `min` and `max` (inclusive).


### generateQuestion()
Returns a randomly generated arithmetic question.

The function:

- Randomly selects an operation
  - +
  - -
  - *
  - /

- Randomly selects a difficulty
  - Easy
  - Medium
  - Hard

- Generates operands based on operation-specific difficulty ranges

- Generates algebraic variable-solving problems

- Uses denominators 1–9 for division problems

### handleSubmit()

Processes user answers by:
- Comparing the submitted answer to the correct answer
- Updating statistics
- Triggering incorrect-answer feedback when needed
- Triggering milestone feedback every 5 correct answers
- Generating the next question after a correct answer
