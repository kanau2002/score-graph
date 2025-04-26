"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Answer, ClientTestSection, TestData } from "@/type/testType";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";
import { displaySubjectName } from "@/lib/display";
import { ROUTES } from "@/constants";
import { isCorrect, threeChoiceOrNot } from "@/lib/test";
import AnswerIcon from "./AnswerIcon";

interface Props {
  testStructureData: TestData;
}

export default function TestCreate({ testStructureData }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // 日付を保持するstate
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isThreeChoice: boolean = threeChoiceOrNot(testStructureData.subject);

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

  // 初期化時に一度だけテストデータを構築
  const initialTestSections = React.useMemo(() => {
    // ベーステストデータに学生の回答を追加
    return testStructureData.testStructure.map((section) => {
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
  }, [testStructureData.testStructure]);

  // テストデータを保持するstate（初期値を設定）
  const [testSections, setTestSections] =
    useState<ClientTestSection[]>(initialTestSections);

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

    const updatedSections = testSections.map((section) => {
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

    setTestSections(updatedSections);
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

    testSections.forEach((section) => {
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

    testSections.forEach((section) => {
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
        return "bg-blue-500 text-white font-bold";
      case Answer.INCORRECT:
        return "bg-red-500 text-white font-bold";
      case Answer.SKIPPED:
        return "bg-gray-300";
    }
  };

  return (
    <div className="container mx-auto max-w-md bg-gray-50 shadow rounded-lg">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-4">
        <Link href={`${ROUTES.MYPAGE}`} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="flex-1 font-bold text-lg">
          {displaySubjectName(testStructureData.subject)}-
          {testStructureData.year}年度
        </h1>
      </div>
      <div className="p-4">
        <h1 className="font-bold ml-4 mb-2">解いた日</h1>
        <DatePicker
          onDateChange={handleDateChange}
          initialDate={selectedDate}
          placeholder="日付を選択してください"
        />
      </div>
      <h1 className="font-bold ml-8 mb-2">解答</h1>
      <table className="w-full border-collapse mt-4 table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              問題番号
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              配点
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              正解
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-full">
              解答
            </th>
          </tr>
        </thead>
        <tbody>
          {testSections.map((section, sectionIndex) => (
            <React.Fragment key={`section-group-${sectionIndex}`}>
              <tr key={`section-${sectionIndex}`} className="bg-gray-50">
                <td
                  colSpan={5}
                  className="border border-gray-300 px-3 py-2 font-semibold"
                >
                  大問{section.section}
                </td>
              </tr>
              {section.questions.map((question, questionIndex) => (
                <tr
                  key={`question-${sectionIndex}-${questionIndex}`}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.questionNumber}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.score !== null ? question.score : "*"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.correctAnswer !== null
                      ? question.correctAnswer
                      : "-"}
                  </td>
                  <td className="border border-gray-300">
                    <div
                      className="overflow-x-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <div className="flex justify-center gap-2 min-w-min mx-3">
                        {choice.map((option) => (
                          <button
                            key={option}
                            className={`w-8 h-8 flex items-center justify-center rounded-full shadow my-2 ${getButtonStyle(
                              option,
                              studentAnswers[
                                `${sectionIndex}-${questionIndex}`
                              ],
                              question.correctAnswer
                            )}`}
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
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-3 py-2 text-center"
                >
                  小計 ({section.sectionTotal.score})
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {section.sectionTotal.studentTotal}
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr className="bg-gray-200 font-bold text-lg">
            <td
              colSpan={3}
              className="border border-gray-300 px-3 py-2 text-center"
            >
              合計 ({testStructureData.maxScore})
            </td>
            <td className="border border-gray-300 px-3 py-2 text-center">
              {totalScore}/{testStructureData.maxScore}
            </td>
          </tr>
        </tbody>
      </table>

      {/* メモ入力欄 */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-3 ml-3">メモ</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="任意でメモを入力できます。例）時間制限は設けませんでした。80分で大問6の前まで解答しました。"
          rows={4}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      </div>

      {/* 送信ボタン */}
      <div className="bg-white rounded-lg shadow p-6 text-center mt-8 mb-8">
        {submitError && (
          <div className="mb-4 text-red-500 text-sm">{submitError}</div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-6 rounded-lg mr-4`}
        >
          {isSubmitting ? "送信中..." : "回答を送信"}
        </button>
      </div>
    </div>
  );
}
