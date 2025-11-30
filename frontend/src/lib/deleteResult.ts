async function deleteResult(eventId: string | number) {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const url = `${apiEndpoint}/api/v1/results/delete_by_event/?event_id=${eventId}`;

  await fetch(url, { method: "DELETE" });
}

export { deleteResult };
