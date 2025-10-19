import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MemberList() {
  // メンバー名の配列を状態として管理
  const [members, setMembers] = useState<string[]>([""]);

  // メンバー追加関数
  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  // 入力内容を更新する関数
  const handleChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  // メンバー削除関数
  const handleDeleteMember = (index: number) => {
    // フィルターで指定index以外を残す
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>メンバー一覧</h2>

      {members.map((member, index) => (
        <div
          key={index}
          style={{
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Input
            type="text"
            value={member}
            placeholder={`メンバー${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
          />

          {/* 削除ボタン */}
          <Button
            onClick={() => handleDeleteMember(index)}
            variant="destructive"
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
        className="cursor-pointer"
      >
        <PlusIcon />
        メンバーを追加
      </Button>
    </div>
  );
}
