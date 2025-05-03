import { ROUTES } from "@/constants";
import { ChevronLeft, CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function BackMypageLink() {
  return (
    <Link href={ROUTES.MYPAGE} className="flex">
      <ChevronLeft />
      <CircleUserRound />
    </Link>
  );
}
