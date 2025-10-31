import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultDetailCard from "./ResultDetailCard";

const sampleResult = [
  { from: "B", to: "A", amount: 4500 },
  { from: "D", to: "A", amount: 14000 },
  { from: "B", to: "C", amount: 2800 },
  { from: "A", to: "C", amount: 3200 },
];

export default function ExampleResultTab() {
  const people = Array.from(
    new Set(
      sampleResult.map((s) => s.from).concat(sampleResult.map((s) => s.to)),
    ),
  );

  return (
    <div className="p-4">
      <Tabs defaultValue={people[0]} className="w-full">
        <TabsList>
          {people.map((person) => (
            <TabsTrigger key={person} value={person}>
              {person}
            </TabsTrigger>
          ))}
        </TabsList>
        {people.map((person) => (
          <TabsContent key={person} value={person}>
            <ResultDetailCard person={person} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}