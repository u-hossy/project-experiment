import BillingTabList from "./components/BillingTabList";
import Header from "./components/Header";
import MemberList from "./components/MemberList";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <h1>メンバー編集画面</h1>
      <MemberList />
      <h1>請求画面</h1>
      <BillingTabList />
    </div>
  );
}

export default App;
