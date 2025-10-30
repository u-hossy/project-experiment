import Header from "./components/Header";
import MemberList from "./components/MemberList";

function App() {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "200px" }}>
      <Header />
      <h1>メンバー編集画面</h1>
      <MemberList />
    </div>
  );
}

export default App;
