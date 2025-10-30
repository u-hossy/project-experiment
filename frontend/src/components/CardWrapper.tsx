import { Card, CardContent } from "@/components/ui/card";

export default function CardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="mx-8 mb-8 h-[630px] overflow-y-auto shadow-md">
      <CardContent>{children}</CardContent>
    </Card>
  );
}
