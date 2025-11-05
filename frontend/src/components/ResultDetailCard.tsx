import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Member, MemberId } from "@/types/member";
import type { Result } from "@/types/result";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(amount);
};

interface ResultDetailCardProps {
  personId: MemberId;
  members: Member[];
  results: Result[];
}

export default function ResultDetailCard({
  personId,
  members,
  results,
}: ResultDetailCardProps) {
  const person = members.find((m) => m.id === personId);
  const personName = person?.name || `メンバー${personId}`;

  const payments = results.filter((result) => result.paidBy === personId);
  const receipts = results.filter((result) => result.paidFor === personId);

  const totalPayment = payments.reduce((sum, item) => sum + item.amount, 0);
  const totalReceipt = receipts.reduce((sum, item) => sum + item.amount, 0);

  const getMemberName = (id: MemberId): string => {
    const member = members.find((m) => m.id === id);
    return member?.name || `メンバー${id}`;
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{personName}さんの精算結果</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full min-h-[250px] items-start gap-6 px-6 py-4">
        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-lg text-red-700">
            支払うお金 ({formatCurrency(totalPayment)}円)
          </h3>
          {payments.length > 0 ? (
            <ul className="ml-4 list-disc space-y-2">
              {payments.map((item) => (
                <li key={item.id}>
                  {getMemberName(item.paidFor)}さんに{" "}
                  <span className="font-bold">
                    {formatCurrency(item.amount)}円
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              {personName}さんが支払うお金はありません。
            </p>
          )}
        </div>

        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-green-700 text-lg">
            受け取るお金 ({formatCurrency(totalReceipt)}円)
          </h3>
          {receipts.length > 0 ? (
            <ul className="ml-4 list-disc space-y-2">
              {receipts.map((item) => (
                <li key={item.id}>
                  {getMemberName(item.paidBy)}さんから{" "}
                  <span className="font-bold">
                    {formatCurrency(item.amount)}円
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              {personName}さんに支払う人はいません。
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
