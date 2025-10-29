import { useEffect, useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import type { Person } from "@/type/person";
import BillingDetailCard from "./BillingDetailCard";


export default function BillingTabList() {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    const fetchPeople = () => {
      fetch("http://localhost:3001/members")
        .then(res => res.json())
        .then(data => setPeople(data))
    }

    fetchPeople()

    const interval = setInterval(fetchPeople, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    (!people.length) ?
    <></> :
    <div className="w-full">
      <Tabs defaultValue={`p${people[0].id}`} className="w-full">
        <TabsList
          className="
            flex
            justify-start
            overflow-x-auto
            whitespace-nowrap
            w-full
            gap-2
          "
        >
          {people.map((person) =>
            <TabsTrigger
              key={person.id}
              value={`p${person.id}`}
              className="
                flex-shrink-0
                min-w-[80px]
                px-3 py-1
              "
            >
              {person.name}
            </TabsTrigger>
          )}
        </TabsList>

        {people.map((person) => (
          <TabsContent key={person.id} value={`p${person.id}`}>
            <BillingDetailCard payer={person}/>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
