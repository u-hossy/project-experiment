import BillingTabList from "./components/BillingTabList";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import CardWrapper from "./components/CardWrapper";

function App() {

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "200px", justifyContent: "center", gap: "32px", }}>
      <Header />
      <CardWrapper>
        <MemberList />
      </CardWrapper>
      <CardWrapper>
        <BillingTabList />
      </CardWrapper>
    </div>
  );
}

export default App;
