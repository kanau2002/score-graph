import { Answer } from "@/type/testType";

export const MATH_CHOICES = [
  Answer.CORRECT,
  Answer.INCORRECT,
  Answer.SKIPPED,
] as const;

export const OTHER_CHOICES = [
  Answer.ONE,
  Answer.TWO,
  Answer.THREE,
  Answer.FOUR,
  Answer.FIVE,
  Answer.SIX,
  Answer.SEVEN,
  Answer.EIGHT,
  Answer.SKIPPED,
] as const;
