import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MemberList() {
  // メンバー名の配列を状態として管理
  const [members, setMembers] = useState<string[]>([""]);
  // 各inputへの参照を保持
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // メンバー追加関数
  const handleAddMember = () => {
    setMembers((prev) => [...prev, ""]);
  };

  // 入力内容を更新する関数
  const handleChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  // メンバー削除関数
  const handleDeleteMember = (index: number) => {
    // アラートの表示
    alert("本当に削除しますか");

    // フィルターで指定index以外を残す
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
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

  // メンバー追加時に自動で新しい欄にフォーカス
  useEffect(() => {
    if (inputRefs.current[members.length - 1]) {
      inputRefs.current[members.length - 1]?.focus();
    }
  }, [members.length]);

  return (
    <div className="p-4">
      <h2 className="mb-2 font-semibold text-xl">メンバー一覧</h2>

      {members.map((member, index) => (
        <div key={index} className="mb-2 flex items-center gap-2">
          <Input
            //各inputを登録
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={member}
            placeholder={`メンバー${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 削除ボタン */}
          <Button
            onClick={() => handleDeleteMember(index)}
            variant="destructive"
            className="cursor-pointer hover:bg-red-700"
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
    </div>
  );
}
