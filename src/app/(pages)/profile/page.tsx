//src/app/(pages)/profile/page.tsx
import TestResultCard from "@/app/(pages)/profile/_components/TestResultCard";

// テスト結果の型定義
interface TestResult {
  id: number;
  date: string;
  year: string;
  teacherScore: number;
  studentScore: number;
  memo: string;
}

export default function ProfilePage() {
  // テストデータ - 講師と生徒両方の点数を含む
  const testResults: TestResult[] = [
    {
      id: 8,
      date: "2024/08/01",
      year: "2018",
      teacherScore: 80,
      studentScore: 75,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 7,
      date: "2024/07/01",
      year: "2017",
      teacherScore: 70,
      studentScore: 65,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 6,
      date: "2024/06/01",
      year: "2016",
      teacherScore: 85,
      studentScore: 80,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 5,
      date: "2024/05/01",
      year: "2015",
      teacherScore: 90,
      studentScore: 85,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 4,
      date: "2024/04/01",
      year: "2014",
      teacherScore: 80,
      studentScore: 75,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 3,
      date: "2024/03/01",
      year: "2013",
      teacherScore: 60,
      studentScore: 55,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 2,
      date: "2024/02/01",
      year: "2012",
      teacherScore: 40,
      studentScore: 45,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
    {
      id: 1,
      date: "2024/01/01",
      year: "2011",
      teacherScore: 10,
      studentScore: 15,
      memo: "この日は調子が悪かったのでしょうがなかった。",
    },
  ];
  // 複数の目標点を配列で指定
  const profileInfo = {
    userName: "数1Aは32点だけど千葉大に受かりたい人",
    targetUniversity: [
      "千葉大学-理学部-地球科学科",
      "明治大学-農学部-農学科",
      "東京農業大学-農学部-農学科",
    ],
    comment:
      "サッカー部の活動時間が長く、勉強時間が1日2時間程度しか取れていないため、内職をして時間を確保したり、過去問をもとに本当に必要なものを優先したりと工夫して勉強しています。",
  };
  return (
    <>
      <TestResultCard
        profileInfo={profileInfo}
        subject="英語"
        testResults={testResults}
        referenceScoreTarget={84}
        referenceScoreLowest={70}
        description={
          "英語は1月から英語長文ポラリス1の文を例文としてスラスラ言えるレベルをテーマに30分/日音読をしたことで伸びた気がします。"
        }
      />
      <TestResultCard
        profileInfo={profileInfo}
        subject="数1A"
        testResults={testResults}
        referenceScoreTarget={75}
        referenceScoreLowest={60}
        description={"数1Aは基礎問を2周回したら70点台に乗りました。"}
      />
      <TestResultCard
        profileInfo={profileInfo}
        subject="数2B"
        testResults={testResults}
        referenceScoreTarget={75}
        referenceScoreLowest={60}
        description={
          "数2Bは基礎問を3周回したら70点台に乗りました。たくさん演習を積むことが大事だと思います。"
        }
      />
    </>
  );
}
