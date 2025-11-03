import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function SidebarLinks() {
  const pages = [
    { name: "ホーム", href: "/" },
    { name: "メンバー追加", href: "/members" },
    { name: "請求追加", href: "/billing" },
    { name: "アルゴリズム選択", href: "/algorithm" },
    { name: "計算結果", href: "/result"},
  ]

  return (
    <Card className="w-64 fixed right-4 top-24 shadow-md rounded-2xl">
      <CardContent className="flex flex-col gap-2 p-4">
        {pages.map((page) => (
          <Button
            key={page.href}
            variant="outline"
            className="justify-start"
            asChild
          >
            <Link to={page.href}>{page.name}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
