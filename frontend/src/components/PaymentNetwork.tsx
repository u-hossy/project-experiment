import CytoscapeComponent from "react-cytoscapejs";

type Debt = {
  from: string;
  to: string;
  amount: number;
};

type Props = {
  debts: Debt[];
};

export default function PaymentNetwork({ debts }: Props) {
  const persons = Array.from(
    new Set(debts.flatMap(d => [d.from, d.to]))
  );

  const elements = [
    ...persons.map(p => ({
      data: { id: p, label: p.toUpperCase() }
    })),
    ...debts.map((d, i) => ({
      data: {
        id: `e-${i}`,
        source: d.from,
        target: d.to,
        label: `${d.amount}円`
      }
    }))
  ];

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
        "background-color": "#4e88ff",
        label: "data(label)",
        color: "#fff",
        "text-valign": "center",
        "font-size": "12px"
      }
    },
    {
      selector: "edge",
      style: {
        label: "data(label)",
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "line-color": "#666",
        "target-arrow-color": "#666",
        "font-size": "10px"
      }
    }
  ];

  return (
    <div 
        style={{
            width: "calc(100% - 48px)", 
            margin: "0 24px",
            height: "500px", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)", 
            borderRadius: "8px", 
            background: "#ffffff"
    }}>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={style}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
