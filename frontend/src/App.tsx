import MemberList from "./components/MemberList";
import Header from "./components/Header";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <h1>メンバー編集画面</h1>
      <MemberList />
    </div>
  );
}

export default App;
