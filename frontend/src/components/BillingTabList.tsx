import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Member } from "@/types/member";
import type { Payment } from "@/types/payment";
import BillingDetailCard from "./BillingDetailCard";

interface BillingTabListProps {
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingTabList({
  members,
  payments,
  setPayments,
}: BillingTabListProps) {
  const filteredMembers = members.filter((member) => member.name !== "");

  if (filteredMembers.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={`tab-${filteredMembers[0].id}`} className="w-full">
      <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
        {filteredMembers.map((member) => (
          <TabsTrigger
            key={member.id}
            value={`tab-${member.id}`}
            className="min-w-20 shrink-0 px-3 py-1"
          >
            {member.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {filteredMembers.map((member) => (
        <TabsContent key={member.id} value={`tab-${member.id}`}>
          <BillingDetailCard
            paidBy={member}
            members={members}
            payments={payments}
            setPayments={setPayments}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
