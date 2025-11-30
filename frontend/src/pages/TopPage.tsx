import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { PlusIcon } from "lucide-react";
import CardWrapper from "@/components/CardWrapper";
import ExampleBillingTabList from "@/components/ExampleBillingTabList";
import ExampleResultTable from "@/components/ExampleResultTable";
import NetworkGraph from "@/components/NetworkGraph";
import SelectAlgorithm from "@/components/SelectAlgorithm";
import TopPageHeader from "@/components/TopPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { algorithms } from "@/data/algorithms";
import { sampleMembers, sampleResults } from "@/data/sampleData";
import { cn } from "@/lib/utils";

export default function TopPage() {
  return (
    <div className="w-full min-w-80 max-w-6xl p-4 pt-60">
      <TopPageHeader />
      <Card className={cn("mb-8 flex w-full scroll-mt-20 flex-col shadow-md")}>
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
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
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
            <Card
              className={cn(
                "mb-8 flex w-full scroll-mt-20 flex-col bg-gray-100 shadow-md",
              )}
            >
              <CardHeader className="font-bold text-2xl tracking-wide">
                <div className="flex h-16 w-full items-center px-4">
                  <img
                    src="/lightbulb.svg"
                    alt="BookOpenアイコン"
                    className="mr-1 h-8 w-8"
                  />
                  <p>説明①</p>
                </div>
              </CardHeader>
              <CardContent>test</CardContent>
            </Card>
          </div>
          <img
            src="/arrow-down.svg"
            alt="下矢印"
            className="mx-auto my-4 h-15 w-15"
          />
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <CardWrapper title="請求の追加" nextButton={null}>
              <ExampleBillingTabList />
            </CardWrapper>
            <Card
              className={cn(
                "mb-8 flex w-full scroll-mt-20 flex-col bg-gray-100 shadow-md",
              )}
            >
              <CardHeader className="font-bold text-2xl tracking-wide">
                <div className="flex h-16 w-full items-center px-4">
                  <img
                    src="/lightbulb.svg"
                    alt="BookOpenアイコン"
                    className="mr-1 h-8 w-8"
                  />
                  <p>説明②</p>
                </div>
              </CardHeader>
              <CardContent>test</CardContent>
            </Card>
          </div>
          <img
            src="/arrow-down.svg"
            alt="下矢印"
            className="mx-auto my-4 h-15 w-15"
          />
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <CardWrapper title="アルゴリズムの選択" nextButton={null}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor={undefined} className="font-medium text-sm">
                    計算アルゴリズム
                  </label>
                  <Select value={""}>
                    <SelectTrigger id={undefined}>
                      <SelectValue placeholder="アルゴリズムを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {algorithms.map((algorithm) => (
                        <SelectItem
                          key={algorithm.id}
                          value={algorithm.id.toString()}
                        >
                          {algorithm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardWrapper>
            <Card
              className={cn(
                "mb-8 flex w-full scroll-mt-20 flex-col bg-gray-100 shadow-md",
              )}
            >
              <CardHeader className="font-bold text-2xl tracking-wide">
                <div className="flex h-16 w-full items-center px-4">
                  <img
                    src="/lightbulb.svg"
                    alt="BookOpenアイコン"
                    className="mr-1 h-8 w-8"
                  />
                  <p>説明➂</p>
                </div>
              </CardHeader>
              <CardContent>test</CardContent>
            </Card>
          </div>
          <img
            src="/arrow-down.svg"
            alt="下矢印"
            className="mx-auto my-4 h-15 w-15"
          />
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div>
              <CardWrapper title="結果表示" nextButton={null}>
                <ExampleResultTable />
              </CardWrapper>
              <CardWrapper title="ネットワークグラフ">
              <NetworkGraph members={sampleMembers} results={sampleResults} />
                  <div className="mt-4 flex gap-4">
                    <Button
                      variant="outline"
                    >
                      戻る
                    </Button>
                  </div>
              </CardWrapper>
            </div>
            <Card
              className={cn(
                "mb-8 flex w-full scroll-mt-20 flex-col bg-gray-100 shadow-md",
              )}
            >
              <CardHeader className="font-bold text-2xl tracking-wide">
                <div className="flex h-16 w-full items-center px-4">
                  <img
                    src="/lightbulb.svg"
                    alt="BookOpenアイコン"
                    className="mr-1 h-8 w-8"
                  />
                  <p>説明④</p>
                </div>
              </CardHeader>
              <CardContent>test</CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
