"use client";
import { ChevronLeft, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackHomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex"
    >
      <ChevronLeft />
      <HomeIcon />
    </button>
  );
}
