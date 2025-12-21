import { TooltipProps } from "recharts";

export enum Subject {
  READING = "READING",
  LISTENING = "LISTENING",
  MATH1A = "MATH1A",
  MATH2B = "MATH2B",
  CHEMISTRY = "CHEMISTRY",
  PHYSICS = "PHYSICS",
  BIOLOGY = "BIOLOGY",
  JAPANESEHISTORY = "JAPANESEHISTORY",
  WORLDHISTORY = "WORLDHISTORY",
  GEOGRAPHY = "GEOGRAPHY",
  CIVICS = "CIVICS",
  INFORMATION = "INFORMATION",
}

export enum Answer {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  SKIPPED = "SKIPPED",
}

export interface SectionPercentages {
  [sectionIndex: number]: number;
}

export interface RadarChartData {
  subject: string;
  score: number;
  target?: number;
  fullMark: number;
}

export interface StudentData {
  name: string;
  score: number;
  percentage: number;
  sectionPercentages: SectionPercentages;
  targetSectionPercentages?: SectionPercentages;
}

export interface StudentRadarChartProps {
  studentData: StudentData;
}

export interface FriendRadarChartProps {
  friendData: StudentData;
}

export type CustomTooltipType = TooltipProps & {
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name?: string;
    payload?: {
      subject: Subject;
      score: number;
      target?: number;
    };
  }>;
};

export interface TestData {
  subject: Subject;
  year: number;
  maxScore: number;
  testStructure: {
    section: number;
    questions: {
      questionNumber: number;
      score: number | null;
      correctAnswer: number | null;
    }[];
    sectionTotal: {
      score: number;
    };
  }[];
}

export interface TestScore {
  questionNumber: number;
  score: number | null;
  correctAnswer: number | null;
}

export interface AnsweredData {
  id: number;
  name: string;
  score: number;
  percentage: number;
  targetPercentage?: number;
  date: string;
  memo: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: Answer;
  };
}

export interface TestResult {
  id: number;
  date: string;
  year: number;
  percentage: number;
  memo: string;
}

export interface ChartData {
  month: string;
  percentage?: number;
  targetPercentage?: number;
}

export interface ClientTestSection {
  section: number;
  questions: {
    questionNumber: number;
    score: number | null;
    correctAnswer: number | null;
    studentAnswer: Answer;
    friendAnswer: Answer | null;
  }[];
  sectionTotal: {
    score: number;
    studentTotal?: number;
    friendTotal?: number;
  };
}

export type TestSubmissionData = {
  userId: number;
  subject: Subject;
  year: number;
  score: number;
  percentage: number;
  date: string;
  memo: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: Answer;
  };
};

export type TestSubmissionResult = {
  success: boolean;
  testId?: number;
  error?: string;
};
