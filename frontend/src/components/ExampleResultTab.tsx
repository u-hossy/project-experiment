// src/components/TabResultDisplay.js
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 2で作成したコンポーネントをインポート
import ResultDetailCard from "./ResultDetailCard"; 

// 擬似的な精算結果データ（ここではファイル内に直接定義します）
const sampleResult = [
  { from: "B", to: "A", amount: 4500 },
  { from: "D", to: "A", amount: 14000 },
  { from: "B", to: "C", amount: 2800 },
];

export default function ExampleResultTab() {
  // sampleResult の "from" と "to" から全ての参加者を抽出
  const people = Array.from(
    new Set(
      sampleResult.map((s) => s.from).concat(sampleResult.map((s) => s.to))
    )
  ).sort(); // A, B, C, D の順にソート

  // 参加者がいない場合はメッセージを表示
  if (people.length === 0) {
    return <div className="p-4">精算データがありません。</div>;
  }
    
  return (
    <div className="p-4">
      <Tabs defaultValue={people[0]} className="w-full">
        {/* --- タブのトリガー部分 (参加者一覧) --- */}
        <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
          {people.map((person) => (
            <TabsTrigger
              key={person}
              value={person}
              className="min-w-[80px] flex-shrink-0 px-3 py-1"
            >
              {person}さん
            </TabsTrigger>
          ))}
        </TabsList>

        {/* --- タブのコンテンツ部分 (精算詳細) --- */}
        {people.map((person) => (
          <TabsContent key={person} value={person}>
            {/* person の精算詳細を表示するコンポーネント */}
            <ResultDetailCard person={person} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}