import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BillingTabList from "../components/BillingTabList";
import CardWrapper from "../components/CardWrapper";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface BillingPageProps {
  members: Member[];
  payments: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

interface MemberResponse {
  member_id: number;
  name: string;
  id: number;
}

interface PaymentResponse {
  payment_id: number;
  paid_by: number;
  paid_for: number;
  amount: number;
  note: string;
}

export default function BillingPage({
  members,
  payments,
  setMembers,
  setPayments,
}: BillingPageProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndNext = async () => {
    if (!eventId) return;
    setIsSaving(true);
    try {
      // フロントエンドのデータをバックエンドの形式に変換
      const payload = {
        event_id: eventId,
        algorithm_id: 1, // 保存目的なので仮のIDが入っているけれど、これは無視されるから大丈夫
        payments: payments.map((p) => ({
          paid_by: p.paidBy,
          paid_for: p.paidFor,
          amount: p.amount,
          note: p.memo || "",
        })),
      };

      // バックエンドに送信
      const res = await fetch(`http://127.0.0.1:8000/api/v1/calculate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("データの保存に失敗しました");
      }

      // 保存が成功したら次の画面に進む
      navigate(`/${eventId}/algorithmAndresults`);

    } catch (error) {
      console.error("保存エラー:", error);
      alert("データの保存に失敗しました。もう一度お試しください。");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!eventId) return;
      const pkToMemberId: Record<number, number> = {};

      try {
        const memRes = await fetch(`http://127.0.0.1:8000/api/v1/members/?event_id=${eventId}`);
        if (!memRes.ok) throw new Error("Members fetch failed");

        const memData = await memRes.json();
        if (Array.isArray(memData)) {
          (memData as MemberResponse[]).forEach((p) => {
            pkToMemberId[p.id] = Number(p.member_id);
            if (pkToMemberId[p.id] === undefined) pkToMemberId[p.id] = Number(p.member_id);
          });

          setMembers(
            (memData as MemberResponse[]).map((p) => ({
              id: Number(p.member_id),
              name: p.name,
            }))
          );
        }

        const payRes = await fetch(`http://127.0.0.1:8000/api/v1/payments/?event_id=${eventId}`);
        if (!payRes.ok) throw new Error("Payments fetch failed");

        const payData = await payRes.json();
        if (Array.isArray(payData)) {
          setPayments(
            (payData as PaymentResponse[]).map((p) => {
              const paidByMapped = pkToMemberId[Number(p.paid_by)];
              const paidForMapped = pkToMemberId[Number(p.paid_for)];

              const finalPaidBy = paidByMapped !== undefined ? paidByMapped : Number(p.paid_by);
              const finalPaidFor = paidForMapped !== undefined ? paidForMapped : Number(p.paid_for);

              return {
                id: p.payment_id,
                paidBy: finalPaidBy,
                paidFor: finalPaidFor,
                amount: p.amount,
                memo: p.note,
              };
            })
          );
        }
      } catch (err) {
        console.error("支払情報の取得失敗:", err);
      }
    };

    loadData();
  }, [eventId, setMembers, setPayments]);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <CardWrapper
        title="請求の追加"
        description="各メンバーに請求したい金額を入力してください"
        nextButton={null} // ボタンは下で自作
      >
        <BillingTabList
          members={members}
          payments={payments}
          setPayments={setPayments}
        />

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => navigate(`/${eventId}/members`)}
            variant="outline"
            disabled={isSaving}
          >
            戻る
          </Button>
          <Button
            onClick={handleSaveAndNext}
            disabled={payments.length === 0}
            size="lg"
          >
            {isSaving ? "保存中..." : "次へ"}
          </Button>
        </div>
      </CardWrapper>
    </div>
  );
}
