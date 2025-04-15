"use client";

import React from "react";
import DOMPurify from "dompurify";
import styles from "./RichContent.module.css";

interface RichContentProps {
  content: string;
  className?: string;
}

const RichContent: React.FC<RichContentProps> = ({
  content,
  className = "",
}) => {
  // クライアントサイドでサニタイズを行う
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ["iframe"], // 動画埋め込み用にiframeを許可
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"], // iframe用の属性を許可
  });

  return (
    <div
      className={`${styles.container} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default RichContent;
