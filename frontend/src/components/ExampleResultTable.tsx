import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleBillings } from "@/data/sampleData";

export default function ExampleResultTable() {
  const people = Array.from(
    new Set(
      sampleBillings.map((s) => s.from).concat(sampleBillings.map((s) => s.to)),
    ),
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          {people.map((p) => (
            <TableHead key={p}>{p}さん</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Aさん</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bさん</TableCell>
          <TableCell>4500円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>2800円</TableCell>
          <TableCell>0円</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Cさん</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Dさん</TableCell>
          <TableCell>14000円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
          <TableCell>0円</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
