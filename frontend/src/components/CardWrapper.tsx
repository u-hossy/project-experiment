import { 
    Card, 
    CardContent,
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";


type CardWrapperProps = {
    title: string;
    children: React.ReactNode;
};

export default function CardWrapper({ title, children } : CardWrapperProps ) {
  return (
    <Card className="mx-8 mb-8 h-[640px] overflow-y-auto shadow-md">
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-wide">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
  );
}
