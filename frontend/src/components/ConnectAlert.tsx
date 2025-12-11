import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConnectAlertProps {
  isConnected: boolean;
}

export function ConnectAlert({ isConnected }: ConnectAlertProps) {
  if (isConnected) {
    return;
  }
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>通信切断</AlertTitle>
      <AlertDescription>サーバーとの接続が失敗しました。</AlertDescription>
    </Alert>
  );
}
