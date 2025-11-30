import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { samplePayments } from "@/data/sampleData";
import ExampleBillingDetailCard from "./ExampleBillingDetailCard";

export default function ExampleBillingTabList() {
  const people = Array.from(
    new Set(
      samplePayments
        .map((s) => s.paidBy)
        .concat(samplePayments.map((s) => s.paidFor)),
    ),
  );

  return (
    <div className="p-4">
      <Tabs defaultValue={`p${people[0]}`} className="w-full">
        <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
          {people.map((person) => (
            <TabsTrigger
              key={person}
              value={`p${person}`}
              className="min-w-[80px] flex-shrink-0 px-3 py-1"
            >
              {person}
            </TabsTrigger>
          ))}
        </TabsList>

        {people.map((person) => (
          <TabsContent key={person} value={`p${person}`}>
            <ExampleBillingDetailCard payer={person} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
