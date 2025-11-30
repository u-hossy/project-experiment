import { PlusIcon } from "lucide-react";
import CardWrapper from "@/components/CardWrapper";
import TopPageHeader from "@/components/TopPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleMembers } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopPage() {
  return (
    <div className="w-full min-w-80 max-w-3xl p-4 pt-60">
      <TopPageHeader />
      <Card
        className={cn(
          "mb-8 flex w-full scroll-mt-20 flex-col shadow-md"
        )}
      >
        <CardHeader>
          <CardTitle className="font-bold text-2xl tracking-wide">
            <div className="flex h-16 w-full items-center px-4">
            <img
            src="/book-open.svg"
            alt="BookOpenアイコン"
            className="mr-2 h-8 w-8"
          />
          <p>使用方法</p>
          </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
        <CardWrapper title="メンバーの追加" nextButton={null}>
          <>
            {sampleMembers.map((member, index) => (
              <div key={member.id} className="mb-2 flex items-center gap-2">
                <Input
                  //各inputを登録
                  type="text"
                  value={member.name}
                  placeholder={`メンバー${index + 1}`}
                  className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 削除ボタン */}
                <Button variant="destructive" className="cursor-pointer">
                  削除
                </Button>
              </div>
            ))}

            {/* メンバー追加ボタン */}
            <Button variant="outline" className="mt-2 cursor-pointer">
              <PlusIcon />
              メンバーを追加
            </Button>
          </>
        </CardWrapper>
        <img src="/arrow-down.svg" alt="下矢印" className="mx-auto my-4 h-15 w-15" />
        <CardWrapper title="請求の追加" nextButton={null}>

        </CardWrapper>
        <img src="/arrow-down.svg" alt="下矢印" className="mx-auto my-4 h-15 w-15" />
        <CardWrapper title="アルゴリズムの選択" nextButton={null}>

        </CardWrapper>
        <img src="/arrow-down.svg" alt="下矢印" className="mx-auto my-4 h-15 w-15" />
        <div>
        <CardWrapper title="結果表示" nextButton={null}>
        
        </CardWrapper>
        <CardWrapper title="ネットワークグラフ">
        </CardWrapper>
        </div>
        </CardContent>
     </Card>

    </div>
  );
}
