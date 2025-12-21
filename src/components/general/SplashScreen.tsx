"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants";
import styles from "./SplashScreen.module.css";

export default function SplashScreen() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたらアニメーションを開始
    setIsAnimated(true);
  }, []);

  return (
    <Link
      href={ROUTES.HOME}
      className="flex items-center justify-center min-h-screen"
    >
      <div
        className={`flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 ${
          isAnimated ? styles.mainAnimation : ""
        }`}
        style={{
          height: "100dvh", // Dynamic viewport height for mobile
        }}
      >
        {/* ロゴとグラフ画像のコンテナ */}
        <div
          className={`${styles.logoContainer} ${
            isAnimated ? styles.visible : styles.hidden
          }`}
        >
          <Image
            src="/graph.png"
            alt="ScoreGraph"
            width={200}
            height={200}
            className="w-40 h-40"
          />
          <Image
            src="/score-graph.png"
            alt="ScoreGraphロゴ"
            width={120}
            height={50}
            className="mx-auto"
          />
        </div>

        {/* タップ指示テキスト */}
        <div
          className={`mt-6 text-center text-lg ${styles.tapText} ${
            isAnimated ? styles.fadeIn : ""
          }`}
        >
          tap!
        </div>
      </div>
    </Link>
  );
}
