import Header from "./components/Header";
import MemberList from "./components/MemberList";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <MemberList />

      <div
        style={{
          borderBottom: "2px solid #ccc",
          marginTop: "20px",
          width: "100%",
        }}
      />
    </div>
  );
}

export default App;
