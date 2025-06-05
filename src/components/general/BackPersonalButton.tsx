"use client";
import { ChevronLeft, SquareUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackPersonalButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex"
    >
      <ChevronLeft />
      <SquareUserRound />
    </button>
  );
}
