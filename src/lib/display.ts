import { Subject } from "@/type/testType";

export const displaySubjectName = (subject: Subject): string => {
  switch (subject) {
    case Subject.READING:
      return "リーディング";
    case Subject.LISTENING:
      return "リスニング";
    case Subject.MATH1A:
      return "数1A";
    case Subject.MATH2B:
      return "数2B";
    case Subject.CHEMISTRY:
      return "化学";
    case Subject.BIOLOGY:
      return "生物";
    case Subject.PHYSICS:
      return "物理";
    case Subject.JAPANESEHISTORY:
      return "日本史";
    case Subject.WORLDHISTORY:
      return "世界史";
    case Subject.GEOGRAPHY:
      return "地理";
    case Subject.CIVICS:
      return "公民";
    case Subject.INFORMATION:
      return "情報";
    default:
      return "不明な科目";
  }
};
