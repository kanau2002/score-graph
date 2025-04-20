import { Answer } from "@/type/testType";
import { Circle, Minus, X } from "lucide-react";

export default function AnswerIcon(answer: Answer | null) {
  if (answer === Answer.CORRECT) return <Circle size={16} />;
  if (answer === Answer.INCORRECT) return <X size={16} />;
  if (answer === Answer.SKIPPED) return <Minus size={16} />;
  return answer;
}
