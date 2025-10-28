import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Person } from "@/type/person";

type BillingDetailModalProps = {
  triggerLabel: string
  people: Person[];
}

export default function BillingDetailModal(
  {triggerLabel, people}: BillingDetailModalProps
) {

  return (
    <Dialog>
     <DialogTrigger>{triggerLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{triggerLabel}さんの請求ページ</DialogTitle>
            {people.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <Checkbox
                id={p.id}
                checked={p.checked}
              />
                <Label htmlFor={p.id}>{p.name}</Label>
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}