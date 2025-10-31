import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 仮のsampleData/sampleResultの型定義とモックデータ
// 実際のアプリケーションでは、これはインポートされたデータを使用します。
type SimplifiedPayment = {
  payer: string; // 支払う人
  receiver: string; // 受け取る人
  amount: number; // 送金金額
};

// 計算結果のモックデータ（前回の回答で使用したものに近しい構造）
const sampleResult: SimplifiedPayment[] = [
  { payer: "Aさん", receiver: "Bさん", amount: 1000 },
  { payer: "Aさん", receiver: "Dさん", amount: 4500 },
  { payer: "Cさん", receiver: "Aさん", amount: 3000 },
  { payer: "Dさん", receiver: "Bさん", amount: 2800 },
  { payer: "Cさん", receiver: "Dさん", amount: 14000 },
];

// すべてのメンバーリスト（Selectコンポーネントのオプション用）
const people = Array.from(
  new Set(
    sampleResult.map((s) => s.payer).concat(sampleResult.map((s) => s.receiver))
  )
);

type FinalResultViewProps = {
  payer: string; // タブで選択された人
};

// 描画された図のレイアウトを再現するコンポーネント
export default function FinalResultView({ payer }: FinalResultViewProps) {
  // 1. 指定されたpayerからの送金（純債務）リストをフィルタリング
  const paymentsOut = sampleResult.filter((b) => b.payer === payer);

  // 2. 指定されたpayerへの受取（純債権）リストをフィルタリング
  const paymentsIn = sampleResult.filter((b) => b.receiver === payer);

  const ResultSection = ({
    title,
    payments,
    isPayer, // true: 支払う人(payer)、false: 受け取る人(receiver)
  }: {
    title: string;
    payments: SimplifiedPayment[];
    isPayer: boolean;
  }) => {
    return (
      <div className="w-1/2 p-2">
        <CardTitle className="text-base mb-3 border-b pb-2">
          {title}
        </CardTitle>
        <div className="space-y-3">
          {payments.length === 0 ? (
            <p className="text-sm text-gray-500">
              {isPayer ? "送金はありません。" : "受取はありません。"}
            </p>
          ) : (
            payments.map((detail, index) => {
              // Select/Inputのvalueとして、isPayerに応じて相手（receiver or payer）と金額を設定
              const target = isPayer ? detail.receiver : detail.payer;
              const amount = detail.amount;

              return (
                <div key={index} className="flex items-center gap-3">
                  {/* 相手の選択（ここでは結果表示なのでReadOnly/Disabled） */}
                  <Select value={target} disabled>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder={isPayer ? "送金先" : "受取元"} />
                    </SelectTrigger>
                    <SelectContent>
                      {people
                        .filter((p) => p !== "")
                        .map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {/* 金額の入力（結果表示なのでReadOnly/Disabled） */}
                  <Input
                    readOnly
                    type="number"
                    disabled={false}
                    placeholder="金額"
                    className="w-[90px] text-right"
                    value={amount}
                  />
                  <span>円</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-4 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">{payer}さんの最終精算結果</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-6">
        {/* 左側: 送金先と金額 (純債務) */}
        <ResultSection
          title={`${payer}さんの送金先と金額`}
          payments={paymentsOut}
          isPayer={true}
        />

        {/* 右側: 受取元と金額 (純債権) */}
        <ResultSection
          title={`${payer}さんの受取元と金額`}
          payments={paymentsIn}
          isPayer={false}
        />
      </CardContent>
    </Card>
  );
}