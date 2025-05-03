import { CalendarDays } from "lucide-react";
import React, { useState, useEffect } from "react";

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}

export default function DatePicker({
  onDateChange,
  initialDate = new Date(),
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(2100, 11, 31),
  placeholder = "日付を選択",
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 日付をフォーマットする関数
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  };

  // yyyy-mm-dd形式の文字列を返す
  const toISODateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // 初期値がある場合はフォーマットする
    if (initialDate) {
      setFormattedDate(formatDate(initialDate));
    }
  }, [initialDate]);

  // ネイティブの日付選択を表示
  const handleOpenPicker = () => {
    // inputRef.currentが存在する場合、フォーカスを当てる
    if (inputRef.current) {
      inputRef.current.focus();

      // モバイルとPCで動作を分ける
      try {
        // モバイル向け - showPickerがサポートされている場合
        if (typeof inputRef.current.showPicker === "function") {
          inputRef.current.showPicker();
        } else {
          // 一部のPCブラウザ向け - クリックイベントを発生させる
          inputRef.current.click();
        }
      } catch {
        // showPickerがサポートされていない場合はクリックイベントを発生
        // エラー変数を使用しないのでキャッチ引数を省略
        inputRef.current.click();
      }
    }
  };

  // 日付が変更された時の処理
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.valueAsDate;
    if (newDate) {
      setSelectedDate(newDate);
      setFormattedDate(formatDate(newDate));

      if (onDateChange) {
        onDateChange(newDate);
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* 表示用のiOS風UI */}
      <div
        onClick={handleOpenPicker}
        className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <span className={`${formattedDate ? "" : "text-gray-500"}`}>
            {formattedDate || placeholder}
          </span>
          <CalendarDays className="" />
        </div>
      </div>

      {/* 実際の日付入力 - 別の配置方法に変更 */}
      <input
        ref={inputRef}
        type="date"
        className="opacity-0 h-0 w-0 absolute"
        value={toISODateString(selectedDate)}
        min={toISODateString(minDate)}
        max={toISODateString(maxDate)}
        onChange={handleDateChange}
      />
    </div>
  );
}
