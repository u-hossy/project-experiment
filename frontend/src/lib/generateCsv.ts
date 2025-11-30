import type { Member } from "@/types/member";
import type { Result } from "@/types/result";

function generateCsv(members: Member[], results: Result[]): string {
  const idToName = Object.fromEntries(members.map((m) => [m.id, m.name]));

  const people = Array.from(
    new Set(
      results
        .map((r) => idToName[r.paidBy])
        .concat(results.map((r) => idToName[r.paidFor])),
    ),
  );

  const matrix: Record<string, Record<string, number>> = {};
  people.forEach((from) => {
    matrix[from] = {};
    people.forEach((to) => (matrix[from][to] = 0));
  });

  results.forEach((r) => {
    const from = idToName[r.paidBy];
    const to = idToName[r.paidFor];
    matrix[from][to] += r.amount;
  });

  const header = ["支払う\\受け取る", ...people].join(",");

  const rows = people.map((from) => {
    const amounts = people.map((to) => matrix[from][to]);
    return [from, ...amounts].join(",");
  });

  return [header, ...rows].join("\n");
}

export { generateCsv };
