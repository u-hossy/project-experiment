import BillingDetailModal from "./components/BillingDetailModal";
import MemberList from "./components/MemberList";

function App() {
  const people = [
    {id: "1", name:"suzuki", checked:false},
    {id: "2", name:"satou", checked:false},
    {id: "3", name:"sasaki", checked:false},
  ]

  return (
    <div style={{ padding: "20px" }}>
      <h1>メンバー編集画面</h1>
      <MemberList />
      <h1>請求画面</h1>
      <BillingDetailModal people={people}/>
    </div>
  );
}

export default App;
