import BillingTabList from "./components/BillingTabList";
import Header from "./components/Header";
import MemberList from "./components/MemberList";

function App() {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "200px" }}>
      <Header />
      <MemberList />
      <BillingTabList />
    </div>
  );
}

export default App;
