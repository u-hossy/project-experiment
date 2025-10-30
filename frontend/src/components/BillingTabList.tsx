import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Person } from "@/type/person";
import BillingDetailCard from "./BillingDetailCard";

export default function BillingTabList() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = () => {
      fetch("http://localhost:3001/members")
        .then((res) => res.json())
        .then((data) => setPeople(data));
    };

    fetchPeople();

    const interval = setInterval(fetchPeople, 2000);

    return () => clearInterval(interval);
  }, []);

  return !people.length ? (
    <></>
  ) : (
    <div className="p-4">
      <h2 className="mb-2 font-semibold text-xl">メンバー一覧</h2>
      <Tabs defaultValue={`p${people[0].id}`} className="w-full">
        <TabsList className="flex w-full justify-start gap-2 overflow-x-auto whitespace-nowrap">
          {people
            .filter((person) => person.name !== "")
            .map((person) => (
            <TabsTrigger
              key={person.id}
              value={`p${person.id}`}
              className="min-w-[80px] flex-shrink-0 px-3 py-1"
            >
              {person.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {people.map((person) => (
          <TabsContent key={person.id} value={`p${person.id}`}>
            <BillingDetailCard payer={person} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
