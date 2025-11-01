import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Member } from "@/types/member";
import type { Result } from "@/types/result";
import ResultDetailCard from "./ResultDetailCard";

const sampleMembers: Member[] = [
  { id: 0, name: "A" },
  { id: 1, name: "B" },
  { id: 2, name: "C" },
  { id: 3, name: "D" },
];

const sampleResult: Result[] = [
  {
    id: 0,
    amount: 4500,
    paidBy: 2,
    paidFor: 0,
  },
  {
    id: 1,
    amount: 14000,
    paidBy: 3,
    paidFor: 0,
  },
  {
    id: 2,
    amount: 2800,
    paidBy: 2,
    paidFor: 3,
  },
];

export default function ResultTab() {
  const people = Array.from(
    new Set(
      sampleResult
        .map((s) => s.paidBy)
        .concat(sampleResult.map((s) => s.paidFor)),
    ),
  );

  const getMemberName = (id: number): string => {
    const member = sampleMembers.find((m) => m.id === id);
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
              members={sampleMembers}
              results={sampleResult}
            />
          </TabsContent>
        ))}
      </Tabs>
  );
}
