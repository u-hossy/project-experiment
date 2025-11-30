export const sampleMembers = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
];

export const samplePayments = [
  { from: "A", to: "A", amount: 8000 },
  { from: "A", to: "B", amount: 8000 },
  { from: "A", to: "C", amount: 8000 },
  { from: "A", to: "D", amount: 8000 },
  { from: "B", to: "A", amount: 1500 },
  { from: "B", to: "B", amount: 1800 },
  { from: "B", to: "C", amount: 1200 },
  { from: "B", to: "D", amount: 2000 },
  { from: "C", to: "A", amount: 4000 },
  { from: "C", to: "B", amount: 4000 },
  { from: "C", to: "C", amount: 4000 },
  { from: "C", to: "D", amount: 4000 },
  { from: "D", to: "", amount: "" },
];

export const sampleResult = [
  { from: "B", to: "A", amount: 4500 },
  { from: "D", to: "A", amount: 14000 },
  { from: "B", to: "C", amount: 2800 },
];
