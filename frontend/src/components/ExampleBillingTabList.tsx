import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleMembers } from "@/data/sampleData";
import ExampleBillingDetailCard from "./ExampleBillingDetailCard";

export default function ExampleBillingTabList() {

  return (
    <Tabs defaultValue={`tab-${sampleMembers[0].id}`} className="w-full">
      <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
        {sampleMembers.map((member) => (
          <TabsTrigger
            key={member.id}
            value={`tab-${member.id}`}
            className="min-w-20 shrink-0 px-3 py-1"
          >
            {member.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {sampleMembers.map((member) => (
        <TabsContent key={member.id} value={`tab-${member.id}`}>
          <ExampleBillingDetailCard
            paidBy={member}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
