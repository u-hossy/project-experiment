import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/PaymentNetwork";
import { datas } from "./tmp/tmp_datas";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <h1>メンバー編集画面</h1>
      <MemberList />
      <PaymentNetwork debts={datas} />
    </div>
  );
}

export default App;
