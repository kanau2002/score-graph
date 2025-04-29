"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Answer, ClientTestSection, TestData } from "@/type/testType";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";
import { displaySubjectName } from "@/lib/display";
import { ROUTES } from "@/constants";
import AnswerIcon from "./AnswerIcon";
import { isCorrect, isMath } from "@/lib/test";

interface Props {
  testStructureData: TestData;
}

export default function TestCreate({ testStructureData }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // 日付を保持するstate
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isThreeChoice: boolean = isMath(testStructureData.subject);

  const choice = isThreeChoice
    ? [Answer.CORRECT, Answer.INCORRECT, Answer.SKIPPED]
    : [
        Answer.ONE,
        Answer.TWO,
        Answer.THREE,
        Answer.FOUR,
        Answer.FIVE,
        Answer.SIX,
        Answer.SEVEN,
        Answer.SKIPPED,
      ];

  // useMemoを使わずに直接テストデータを構築
  // ベーステストデータに学生の回答を追加
  const testSections = testStructureData.testStructure.map((section) => {
    // 各セクションの質問を更新
    const updatedQuestions = section.questions.map((question) => {
      return {
        ...question,
        studentAnswer: Answer.SKIPPED, // 初期値として SKIPPED を設定
        friendAnswer: null, // null を設定（比較対象がいないため）
      };
    });

    return {
      ...section,
      questions: updatedQuestions,
      sectionTotal: {
        ...section.sectionTotal,
        studentTotal: 0, // 初期化時は0点
      },
    };
  });

  // テストデータを保持するstate（初期値を設定）
  const [updatedTestSections, setUpdatedTestSections] =
    useState<ClientTestSection[]>(testSections);

  // 総合得点を保持するstate
  const [totalScore, setTotalScore] = useState<number>(0);

  // 回答を保存するstate
  const [studentAnswers, setStudentAnswers] = useState<{
    [key: string]: Answer;
  }>({});

  // メモを保存するstate
  const [memo, setMemo] = useState<string>("");

  // 日付をフォーマットする関数 (YYYY-MM-DD形式)
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 日付が変更された時の処理
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // 問題グループを構築する関数
  const buildQuestionGroups = (section: ClientTestSection) => {
    const groups = [];
    let currentGroup = null;

    for (let i = 0; i < section.questions.length; i++) {
      const question = section.questions[i];

      if (question.score !== null) {
        // 新しいグループの開始
        currentGroup = {
          startIndex: i,
          score: question.score,
          questions: [i],
          hasNullScore: false,
        };
        groups.push(currentGroup);
      } else if (currentGroup) {
        // 既存のグループにnullスコアの問題を追加
        currentGroup.questions.push(i);
        currentGroup.hasNullScore = true;
      }
    }

    return groups;
  };

  // 得点を計算する関数
  const calculateScores = (updatedAnswers: { [key: string]: Answer }) => {
    let newTotalScore = 0;

    const updatedSections = updatedTestSections.map((section) => {
      let sectionScore = 0;

      // 各質問の回答を更新
      const updatedQuestions = section.questions.map((question, qIndex) => {
        const answerKey = `${section.section - 1}-${qIndex}`;
        return {
          ...question,
          studentAnswer: updatedAnswers[answerKey],
        };
      });

      const sectionWithUpdatedQuestions = {
        ...section,
        questions: updatedQuestions,
      };

      // 問題グループを構築
      const groups = buildQuestionGroups(sectionWithUpdatedQuestions);

      // 各グループを採点
      groups.forEach((group) => {
        let allCorrect = true;

        // グループ内の全問題が正解かチェック
        for (const qIndex of group.questions) {
          const question = sectionWithUpdatedQuestions.questions[qIndex];
          const answerKey = `${section.section - 1}-${qIndex}`;
          const studentAnswer = updatedAnswers[answerKey];

          // 回答がまだない場合、グループは不正解
          if (studentAnswer === undefined) {
            allCorrect = false;
            continue;
          }

          // 回答の正誤を確認
          const isCorrect =
            String(question.correctAnswer) === studentAnswer ||
            studentAnswer === Answer.CORRECT;

          // 不正解があれば、グループ全体が不正解
          if (!isCorrect) {
            allCorrect = false;
          }
        }

        // スコア計算
        if (allCorrect) {
          if (group.hasNullScore) {
            // nullスコアを含むグループで全問正解
            sectionScore += group.score;
          } else {
            // 単独問題（nullスコアなし）で正解
            sectionScore += group.score;
          }
        }
      });

      newTotalScore += sectionScore;

      return {
        ...sectionWithUpdatedQuestions,
        sectionTotal: {
          ...section.sectionTotal,
          studentTotal: sectionScore,
        },
      };
    });

    setUpdatedTestSections(updatedSections);
    setTotalScore(newTotalScore);
  };

  // 回答を更新する関数
  const handleAnswerChange = (
    sectionIndex: number,
    questionIndex: number,
    answer: Answer
  ) => {
    const key = `${sectionIndex}-${questionIndex}`;
    const updatedAnswers = {
      ...studentAnswers,
      [key]: answer,
    };

    setStudentAnswers(updatedAnswers);

    // 得点を計算
    calculateScores(updatedAnswers);
  };

  // 回答データを準備する関数
  const prepareSubmitData = () => {
    // セクションごとの得点・パーセンテージを計算
    const sectionTotals: { [key: number]: number } = {};
    const sectionPercentages: { [key: number]: number } = {};

    updatedTestSections.forEach((section) => {
      sectionTotals[section.section] = section.sectionTotal.studentTotal || 0;
      sectionPercentages[section.section] =
        section.sectionTotal.score > 0
          ? Math.round(
              ((section.sectionTotal.studentTotal || 0) * 100) /
                section.sectionTotal.score
            )
          : 0;
    });

    // 質問番号ごとの回答データを変換
    const answers: { [key: number]: Answer } = {};

    updatedTestSections.forEach((section) => {
      section.questions.forEach((question, qIndex) => {
        const key = `${section.section - 1}-${qIndex}`;
        if (studentAnswers[key]) {
          answers[question.questionNumber] = studentAnswers[key];
        }
      });
    });

    // 全体の正解率
    const percentage =
      testStructureData.maxScore > 0
        ? Math.round((totalScore * 100) / testStructureData.maxScore)
        : 0;

    return {
      subject: testStructureData.subject,
      year: testStructureData.year,
      score: totalScore,
      percentage,
      date: formatDateToString(selectedDate), // 選択された日付を使用
      memo,
      sectionTotals,
      sectionPercentages,
      answers,
    };
  };

  // 回答を送信する関数
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // 最終得点を計算
      calculateScores(studentAnswers);

      // 送信データを準備
      const submitData = prepareSubmitData();

      // APIに送信
      const response = await fetch("/api/tests/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "エラーが発生しました");
      }

      // 送信成功
      alert("回答が送信されました");

      // プロフィールページに戻る
      router.push(ROUTES.MYPAGE);
    } catch (error) {
      console.error("送信エラー:", error);
      setSubmitError(
        error instanceof Error ? error.message : "送信中にエラーが発生しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 回答ボタンの背景色を決定する関数
  const getButtonStyle = (
    option: Answer,
    selectedAnswer: Answer | undefined,
    correctAnswer: number | null
  ) => {
    // 未選択の場合は白色
    if (!selectedAnswer) return "bg-white";

    // 現在のオプションが選択されていない場合は白色
    if (selectedAnswer !== option) return "bg-white";

    // 選択されたオプションの場合、正誤に応じた色を返す
    const status = isCorrect(correctAnswer, option, isThreeChoice);
    switch (status) {
      case Answer.CORRECT:
        return "bg-blue-100 border-blue-200 text-blue-600";
      case Answer.INCORRECT:
        return "bg-red-100 border-red-200 text-red-600";
      case Answer.SKIPPED:
        return "bg-gray-100 border-gray-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  // パーセンテージを計算
  const percentage =
    testStructureData.maxScore > 0
      ? Math.round((totalScore * 100) / testStructureData.maxScore)
      : 0;

  return (
    <div className="container mx-auto max-w-md bg-white shadow-lg rounded-xl overflow-hidden text-gray-700 pb-20">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 font-bold text-lg">
          {displaySubjectName(testStructureData.subject)}-
          {testStructureData.year}年度
        </h1>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-blue-600 ml-2">
            {percentage}
            <span className="text-lg">%</span>
          </span>
        </div>
      </div>

      {/* 日付選択部分 */}
      <div className="p-5">
        <h2 className="text-sm font-bold mb-2 ml-4">解いた日</h2>
        <DatePicker
          onDateChange={handleDateChange}
          initialDate={selectedDate}
          placeholder="日付を選択してください"
        />
      </div>

      {/* 解答表示部分 */}
      <div className="px-5 mt-4">
        {updatedTestSections.map((section, sectionIndex) => (
          <div key={`section-group-${sectionIndex}`} className="mb-6">
            <div className="mb-2 ml-4">
              <h3 className="font-bold text-sm">大問{section.section}</h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 mb-3">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-200 text-center text-xs text-gray-500">
                    <th className="p-3 w-12 min-w-[3rem]">問題</th>
                    <th className="p-3 w-12 min-w-[3rem]">配点</th>
                    <th className="p-3 w-12 min-w-[3rem]">正解</th>
                    <th className="p-3">解答</th>
                  </tr>
                </thead>
                <tbody>
                  {section.questions.map((question, questionIndex) => (
                    <tr
                      key={`question-${sectionIndex}-${questionIndex}`}
                      className="border-b border-gray-100"
                    >
                      <td className="p-3 text-center">
                        {question.questionNumber}.
                      </td>
                      <td className="p-3 text-center text-gray-500">
                        {question.score !== null ? "+" + question.score : "-"}
                      </td>
                      <td className="p-3 text-center text-gray-500">
                        {question.correctAnswer !== null
                          ? question.correctAnswer
                          : "-"}
                      </td>
                      <td className="p-2">
                        <div
                          className="overflow-x-auto"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <div className="flex gap-2 w-fit p-1">
                            {choice.map((option) => (
                              <button
                                key={option}
                                className={`w-8 h-8 flex items-center justify-center rounded-full border ${getButtonStyle(
                                  option,
                                  studentAnswers[
                                    `${sectionIndex}-${questionIndex}`
                                  ],
                                  question.correctAnswer
                                )} transition-all duration-200 shadow-sm transform hover:scale-110`}
                                onClick={() =>
                                  handleAnswerChange(
                                    sectionIndex,
                                    questionIndex,
                                    option
                                  )
                                }
                                type="button"
                              >
                                {AnswerIcon(option)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={3} className="p-4 text-sm text-right">
                      小計 ({section.sectionTotal.score})
                    </td>
                    <td className="text-center">
                      {section.sectionTotal.studentTotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}

        {/* 合計スコア表示 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center justify-between">
          <span className="font-bold">
            合計 ({testStructureData.maxScore}点)
          </span>
          <div className="flex flex-col items-end">
            <span className="font-bold text-xl">
              {totalScore}/{testStructureData.maxScore}
            </span>
            <span className="text-sm">({percentage}%)</span>
          </div>
        </div>
      </div>

      {/* メモ入力欄 */}
      <div className="px-5 mb-8">
        <h2 className="font-bold text-sm mb-2 ml-5">メモ</h2>
        <textarea
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
          placeholder="任意でメモを入力できます。例）時間制限は設けませんでした。80分で大問6の前まで解答しました。"
          rows={4}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      </div>

      {/* 送信ボタン */}
      <div className="px-5 text-center">
        {submitError && (
          <div className="mb-4 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {submitError}
          </div>
        )}
        <div className="flex justify-between p-2">
          <button type="button" onClick={() => router.back()}>
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-blue-500 font-bold"
          >
            {isSubmitting ? "送信中..." : "完了"}
          </button>
        </div>
      </div>
    </div>
  );
}
