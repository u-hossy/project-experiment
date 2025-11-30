import CytoscapeComponent from "react-cytoscapejs";
import type { Member } from "@/types/member";
import type { Result } from "@/types/result";

interface Props {
  members: Member[];
  results: Result[];
}

export default function NetworkGraph({ members, results }: Props) {
  if (results.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          アルゴリズムを選択して送信すると、ネットワークグラフがここに表示されます。
        </p>
      </div>
    );
  }

  const idToName = Object.fromEntries(members.map((m) => [m.id, m.name]));

  const people = Array.from(
    new Set(
      results
        .map((r) => idToName[r.paidBy])
        .concat(results.map((r) => idToName[r.paidFor])),
    ),
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
  people.forEach((p) => {
    colorMap.set(p, randomColor());
  });

  const nodes = people.map((p) => ({
    data: {
      id: p,
      label: p,
      color: colorMap.get(p),
    },
  }));

  const edges = results.map((r, i) => ({
    data: {
      id: `e-${i}`,
      source: idToName[r.paidBy],
      target: idToName[r.paidFor],
      label: `${r.amount}円`,
      color: colorMap.get(idToName[r.paidBy]),
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
        color: "rgba(0, 0, 0, 0)",
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
