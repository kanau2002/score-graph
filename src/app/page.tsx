import Link from "next/link";
import { ROUTES } from "@/constants";
import { ChevronRight, HomeIcon } from "lucide-react";

export default function RootPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href={ROUTES.HOME} className="flex">
        <HomeIcon />
        <ChevronRight />
      </Link>
    </div>
  );
}
