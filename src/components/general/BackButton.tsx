"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mr-3">
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}
