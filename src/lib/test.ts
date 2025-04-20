import { Answer, Subject } from "@/type/testType";

export function threeChoiceOrNot(subject: Subject) {
  if (subject === Subject.MATH1A || subject === Subject.MATH2B) return true;
  return false;
}

// 正解不正解の判定関数
export const isCorrect = (
  correct: number | null,
  answer: Answer,
  isThreeChoice: boolean
) => {
  if (answer === Answer.CORRECT || String(correct) === answer)
    return Answer.CORRECT;
  if (answer === Answer.SKIPPED) return Answer.SKIPPED;
  if (!isThreeChoice && correct === null) return Answer.SKIPPED;
  return Answer.INCORRECT;
};
