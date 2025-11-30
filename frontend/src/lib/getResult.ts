type ResultResuponse = {
  result_id: number;
  paid_by: number;
  paid_for: number;
  amount: number;
};

async function getResult(eventId: string | number) {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const url = `${apiEndpoint}/api/v1/results/?event_id=${eventId}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  return (data as ResultResuponse[]).map((item) => ({
    id: item.result_id,
    paidBy: item.paid_by,
    paidFor: item.paid_for,
    amount: item.amount,
  }));
}

export { getResult };
