import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 精算結果アイテムの型定義
interface ResultItem {
  from: string;
  to: string;
  amount: number;
}

// 擬似的な精算結果データ(Sampledataから取れるように明日変更します)
const sampleResult: ResultItem[] = [
  { from: "B", to: "A", amount: 4500 },
  { from: "D", to: "A", amount: 14000 },
  { from: "B", to: "C", amount: 2800 },
  { from: "A", to: "C", amount: 3200 },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(amount);
};

interface ResultDetailCardProps {
  person: string;
}

export default function ResultDetailCard({ person }: ResultDetailCardProps) {
  const payments = sampleResult.filter((result) => result.from === person); // 支払うお金
  const receipts = sampleResult.filter((result) => result.to === person); // 受け取るお金

  const totalPayment = payments.reduce((sum, item) => sum + item.amount, 0);
  const totalReceipt = receipts.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{person}さんの精算結果</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full min-h-[250px] items-start gap-6 px-6 py-4">
        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-lg text-red-700">
            支払うお金 ({formatCurrency(totalPayment)})
          </h3>
          {payments.length > 0 ? (
            <ul className="ml-4 list-inside list-disc space-y-2">
              {payments.map((item, index) => (
                <li key={index}>
                  {item.to}さんに{" "}
                  <span className="font-bold">
                    {formatCurrency(item.amount)}円
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
            {person}さんが支払うお金はありません。
            </p>
          )}
        </div>

        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-green-700 text-lg">
            受け取るお金 ({formatCurrency(totalReceipt)})
          </h3>
          {receipts.length > 0 ? (
            <ul className="ml-4 list-inside list-disc space-y-2">
              {receipts.map((item, index) => (
                <li key={index}>
                  {item.from}さんから{" "}
                  <span className="font-bold">
                    {formatCurrency(item.amount)}円
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
            {person}さんに支払う人はいません。
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}