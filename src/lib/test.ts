import { Answer, Subject } from "@/type/testType";

export function mathOrNot(subject: Subject) {
  if (subject === Subject.MATH1A || subject === Subject.MATH2B) return true;
  return false;
}

// 正解不正解の判定関数
export const isCorrect = (
  isMath: boolean,
  answer: Answer,
  correct?: number
): Answer => {
  // スキップは共通
  if (answer === Answer.SKIPPED) return Answer.SKIPPED;

  // 数学の場合は解答値をそのまま返す
  if (isMath) return answer;

  // その他の科目は正解と比較
  return answer === String(correct) ? Answer.CORRECT : Answer.INCORRECT;
};
