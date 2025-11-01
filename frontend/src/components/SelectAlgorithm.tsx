import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { algorithms } from "@/data/algorithms";

interface SelectAlgorithmProps {
  algorithmId: number | undefined;
  setAlgorithmId: (id: number) => void;
}

export default function SelectAlgorithm({
  algorithmId,
  setAlgorithmId,
}: SelectAlgorithmProps) {
  const selectId = useId();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor={selectId} className="font-medium text-sm">
          計算アルゴリズム
        </label>
        <Select
          value={algorithmId?.toString()}
          onValueChange={(value) => setAlgorithmId(Number(value))}
        >
          <SelectTrigger id={selectId}>
            <SelectValue placeholder="アルゴリズムを選択してください" />
          </SelectTrigger>
          <SelectContent>
            {algorithms.map((algorithm) => (
              <SelectItem key={algorithm.id} value={algorithm.id.toString()}>
                {algorithm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
