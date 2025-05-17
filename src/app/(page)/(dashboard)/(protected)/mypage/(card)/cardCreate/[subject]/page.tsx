import CardCreate from "../../../../../../../../components/(card)/CardCreate";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject }>;
};

export default async function CardCreatePage({ params }: Props) {
  const { subject } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <CardCreate subject={subject} />
    </div>
  );
}
