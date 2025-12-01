import { DialogDescription } from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Payment } from "@/types/payment";

export function ExampleDialogMemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer select-none rounded-full p-2 transition`}
        >
          <img
            src="/notebook-text.svg"
            alt="ノートアイコン"
            className="mr-2 ml-2 h-9 w-9"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>メモ</DialogTitle>
          <DialogDescription>
            入力後に閉じると自動で保存されます。
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="string"
              placeholder=""
              defaultValue="請求に関する簡単なメモを残すことができます。"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
