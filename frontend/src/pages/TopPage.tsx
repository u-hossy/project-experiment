import CardWrapper from "@/components/CardWrapper";
import TopPageHeader from "@/components/TopPageHeader";

export default function TopPage() {
  return (
    <div className="w-full min-w-80 max-w-3xl p-4 pt-60">
      <TopPageHeader />
      <CardWrapper
        title="使用例"
        nextButton={null} // ボタンは下で自作
      >
        <h1>test</h1>
      </CardWrapper>
    </div>
  );
}
