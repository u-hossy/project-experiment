import CytoscapeComponent from "react-cytoscapejs";

type Debt = {
  from: string;
  to: string;
  amount: number;
};

type Props = {
  debts: Debt[];
};

export default function NetworkGraph({ debts }: Props) {
  const people = Array.from(
    new Set(debts.map((d) => d.from).concat(debts.map((d) => d.to))),
  );

  const randomColor = () => {
    return (
      "#" +
      [0, 1, 2, 3, 4, 5]
        .map((_) => Math.floor(Math.random() * 0x10).toString(16))
        .join("")
    );
  };

  const colorMap = new Map<string, string>();
  people.forEach((p) => colorMap.set(p, randomColor()));

  const nodes = people.map((p) => ({
    data: {
      id: p,
      label: p,
      color: colorMap.get(p),
    },
  }));

  const edges = debts.map((d, i) => ({
    data: {
      id: `e-${i}`,
      source: d.from,
      target: d.to,
      label: `${d.amount}円`,
      color: colorMap.get(d.from),
    },
  }));

  const elements = [...nodes, ...edges];

  const layout = {
    name: "cose",
    animate: false,
    nodeRepulsion: 8000000000,
    idealEdgeLength: 1000,
    gravity: 0.01,
    numIter: 1000,
  };

  const style = [
    {
      selector: "node",
      style: {
        width: 60,
        height: 60,
        "background-color": "data(color)",
        label: "data(label)",
        color: "#00000000",
        "text-valign": "center",
        "font-size": "15px",
      },
    },
    {
      selector: "edge",
      style: {
        label: "data(label)",
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "line-color": "data(color)",
        "target-arrow-color": "data(color)",
        "font-size": "18px",
      },
    },
  ];

  return (
    <div
      style={{
        width: "calc(100% - 48px)",
        margin: "0 24px",
        height: "500px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        background: "#ffffff",
      }}
    >
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={style}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
