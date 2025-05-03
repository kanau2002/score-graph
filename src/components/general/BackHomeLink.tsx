import { ROUTES } from "@/constants";
import { ChevronLeft, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function BackHomeLink() {
  return (
    <Link href={ROUTES.HOME} className="flex">
      <ChevronLeft />
      <HomeIcon />
    </Link>
  );
}
