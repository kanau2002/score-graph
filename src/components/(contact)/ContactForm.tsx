"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import BackHomeLink from "../general/BackHomeLink";

export default function ContactForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(ROUTES.HOME);
      } else {
        setError(data.error);
      }
    } catch {
      setError("送信できませんでした");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 min-h-screen">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <h1 className="text-xl font-bold text-center my-6">お問い合わせ</h1>

      <div className="mb-4">
        <label htmlFor="message" className="block mb-1">
          お問い合わせ内容 *
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          placeholder="例）センター2017年度の英語を入力していますが、正しく点数が計算されない問題が起きています。問題番号21の配点が間違っていそうです。..."
          className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="flex justify-between p-2 mt-12">
        <BackHomeLink />
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-blue-500 font-bold"
        >
          {isSubmitting ? "送信中..." : "送信"}
        </button>
      </div>
    </form>
  );
}
