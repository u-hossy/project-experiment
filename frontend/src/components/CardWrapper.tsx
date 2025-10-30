import {
  Card,
  CardContent,
} from "@/components/ui/card"


export default function CardWrapper({ children }: { children: React.ReactNode }) {
    return(
        <Card className="shadow-md overflow-y-auto h-[630px] mb-8 mx-8">
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}