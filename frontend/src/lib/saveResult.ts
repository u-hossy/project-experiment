import type { Result } from "@/types/result";

async function saveResult(eventId: number | string, results: Result[]) {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const url = `${apiEndpoint}/api/v1/results/`;

  for (const r of results) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        result_id: r.id,
        paid_by: r.paidBy,
        paid_for: r.paidFor,
        amount: r.amount,
      }),
    });
  }
}

export { saveResult };
