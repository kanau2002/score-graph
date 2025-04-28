import Link from "next/link";
import { ROUTES } from "@/constants";

export default function RootPage() {
  return <Link href={ROUTES.HOME}>ホーム</Link>;
}
