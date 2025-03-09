import TestResultCard from "@/app/components/general/TestResultCard";

// テスト結果の型定義
interface TestResult {
  date: string;
  year: string;
  teacherScore: number;
  studentScore: number;
}

export default function ProfilePage() {
  // テストデータ - 講師と生徒両方の点数を含む
  const testResults: TestResult[] = [
    { date: "2024/08/01", year: "2018", teacherScore: 80, studentScore: 75 },
    { date: "2024/07/01", year: "2017", teacherScore: 70, studentScore: 65 },
    { date: "2024/06/01", year: "2016", teacherScore: 85, studentScore: 80 },
    { date: "2024/05/01", year: "2015", teacherScore: 90, studentScore: 85 },
    { date: "2024/04/01", year: "2014", teacherScore: 80, studentScore: 75 },
    { date: "2024/03/01", year: "2013", teacherScore: 60, studentScore: 55 },
    { date: "2024/02/01", year: "2012", teacherScore: 40, studentScore: 45 },
    { date: "2024/01/01", year: "2011", teacherScore: 10, studentScore: 15 },
  ];
  // 複数の目標点を配列で指定
  // 目標点数と最低ライン
  const referenceScoreTarget = 84;
  const referenceScoreLowest = 70;
  const profileInfo = {
    targetUniversity: [
      "千葉大学-理学部-地球科学科",
      "明治大学-農学部-農学科",
      "東京農業大学-農学部-農学科",
    ],
    comment:
      "サッカー部の活動時間が長く、勉強時間が1日2時間程度しか取れていないため、内職をして時間を確保したり、過去問をもとに本当に必要なものを優先したりと工夫して勉強しています。",
  };
  const longDescription =
    "英語は1月から英語長文ポラリス1の文を例文としてスラスラ言えるレベルをテーマに30分/日音読をしたことで伸びた気がします。";

  return (
    <>
      <TestResultCard
        userName="高三10月に文転したけど横国に行くぞ！"
        subject="英語"
        testResults={testResults}
        referenceScoreTarget={referenceScoreTarget}
        referenceScoreLowest={referenceScoreLowest}
        profileInfo={profileInfo}
        description={longDescription}
      />
      <TestResultCard
        userName="数1Aは32点だけど千葉大に受かりたい人"
        subject="数1A"
        testResults={testResults}
        referenceScoreTarget={referenceScoreTarget}
        referenceScoreLowest={referenceScoreLowest}
        profileInfo={profileInfo}
        description={longDescription}
      />
      <TestResultCard
        userName="kanau888"
        subject="数2B"
        testResults={testResults}
        referenceScoreTarget={referenceScoreTarget}
        referenceScoreLowest={referenceScoreLowest}
        profileInfo={profileInfo}
        description={longDescription}
      />
    </>
  );
}
