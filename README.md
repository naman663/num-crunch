# Num Crunch

Num Crunch is a lightweight mental-math training application designed for fast arithmetic practice across addition, subtraction, multiplication, and division.

Questions are continuously generated with randomized operations and randomized difficulty levels to create a varied training experience.

Deployed with vercel, this application is meant for the iphone experience for now.

## Current Functionality

- Random arithmetic question generation
  - Addition
  - Subtraction
  - Multiplication
  - Division

- Random difficulty assignment
  - Easy
  - Medium
  - Hard

- Automatic answer validation

- Incorrect-answer modal feedback

- Milestone modal every 5 correct answers

- Running session statistics
  - Correct answers
  - Incorrect answers
  - Accuracy %

- Separate iOS and Web layouts

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

- Prevents negative subtraction answers

- Uses denominators 1–9 for division problems

## Difficulty System

Difficulty is selected randomly for every question.

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