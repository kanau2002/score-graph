"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mr-3">
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}
