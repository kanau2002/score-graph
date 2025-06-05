"use client";
import { ChevronLeft, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackNewsButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex"
    >
      <ChevronLeft />
      <Newspaper />
    </button>
  );
}
