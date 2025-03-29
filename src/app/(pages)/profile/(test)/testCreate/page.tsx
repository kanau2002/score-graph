type Props = {
  searchParams: {
    subject: string;
    year: number;
  };
};

export default function TestCreatePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);

  return (
    <>
      <p>TestCreatePage</p>
      <p>科目: {subject}</p>
      <p>年度: {year}</p>
    </>
  );
}
