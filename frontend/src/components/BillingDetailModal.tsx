import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Person } from "@/type/person";

type BillingDetailModalProps = {
  people: Person[];
}

export default function BillingDetailModal({ people }: BillingDetailModalProps) {
  return (
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
          {people.map((person) => (
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
          ))}
        </TabsList>

        {people.map((person) => (
          <TabsContent key={person.id} value={`p${person.id}`}>
            {`${person.name} さんの送金先と金額`}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
