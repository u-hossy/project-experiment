import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface MemberListProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function MemberList({
  members,
  setMembers,
  setPayments,
}: MemberListProps) {
  // 各inputへの参照を保持
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // 最後に追加されたメンバーにフォーカスを当てるためのフラグ
  const [shouldFocusLast, setShouldFocusLast] = useState(false);

  // メンバー追加関数
  const handleAddMember = () => {
    const newMember: Member = {
      id: members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 0,
      name: "",
    };
    setMembers((prev) => [...prev, newMember]);
    // フォーカス予約
    setShouldFocusLast(true);

    // 次のレンダー後にフォーカスを当てる
    setTimeout(() => {
      const lastIndex = inputRefs.current.length - 1;
      inputRefs.current[lastIndex]?.focus();
    }, 0);
  };

  // 入力内容を更新する関数
  const handleChange = (index: number, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index].name = value;
      return updated;
    });
  };

  // メンバー削除関数
  const handleDeleteMember = (index: number) => {
    const targetMember = members[index];

    // 名前が空白でない場合のみアラートを表示
    if (targetMember.name.trim() !== "") {
      if (
        !confirm(
          `${targetMember.name}さんを削除しますか？\n関連する請求も削除されます。`,
        )
      ) {
        return;
      }
    }

    // メンバーを削除
    setMembers((prev) => prev.filter((_, i) => i !== index));

    // 削除するメンバーに関連するpaymentsも削除
    setPayments((prev) =>
      prev.filter(
        (payment) =>
          payment.paidBy !== targetMember.id &&
          payment.paidFor !== targetMember.id,
      ),
    );
  };

  // Enterキー押下時の挙動
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // 日本語入力中のEnterは無視
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();

      // 最後の要素なら新しい入力欄を追加
      if (index === members.length - 1) {
        handleAddMember();
      } else {
        // 次の入力欄にフォーカス
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // メンバー追加後に自動フォーカス
  useEffect(() => {
    if (shouldFocusLast && members.length > 0) {
      const lastIndex = members.length - 1;
      inputRefs.current[lastIndex]?.focus();
      // 一度だけ実行
      setShouldFocusLast(false);
    }
  }, [members, shouldFocusLast]);

  return (
    <>
      {members.map((member, index) => (
        <div key={member.id} className="mb-2 flex items-center gap-2">
          <Input
            //各inputを登録
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={member.name}
            placeholder={`メンバー${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 削除ボタン */}
          <Button
            variant="destructive"
            onClick={() => handleDeleteMember(index)}
            className="cursor-pointer"
          >
            削除
          </Button>
        </div>
      ))}

      {/* メンバー追加ボタン */}
      <Button
        onClick={handleAddMember}
        variant="outline"
        className="mt-2 cursor-pointer"
      >
        <PlusIcon />
        メンバーを追加
      </Button>
    </>
  );
}
