import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Member } from "@/types/member";
import type { Result } from "@/types/result";
import ResultDetailCard from "./ResultDetailCard";

interface ResultProps {
  members: Member[];
  results: Result[];
}

export default function ResultTab({ members, results }: ResultProps) {
  // 結果がない場合の表示
  if (results.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          アルゴリズムを選択して送信すると、計算結果がここに表示されます。
        </p>
      </div>
    );
  }

  const people = Array.from(
    new Set(results.map((s) => s.paidBy).concat(results.map((s) => s.paidFor))),
  );

  const getMemberName = (id: number): string => {
    const member = members.find((m) => m.id === id);
    return member?.name || `メンバー${id}`;
  };

  return (
    <Tabs defaultValue={String(people[0])} className="w-full">
      <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
        {people.map((person) => (
          <TabsTrigger
            key={person}
            value={String(person)}
            className="min-w-20 shrink-0 px-3 py-1"
          >
            {getMemberName(person)}さん
          </TabsTrigger>
        ))}
      </TabsList>

      {people.map((person) => (
        <TabsContent key={person} value={String(person)}>
          <ResultDetailCard
            personId={person}
            members={members}
            results={results}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
