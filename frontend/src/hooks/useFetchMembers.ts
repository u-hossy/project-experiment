import { useCallback } from "react";
import type { Member } from "@/types/member";

interface FetchMembersProps {
  eventId?: string;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

interface MemberResponse {
  member_id: number;
  name: string;
  id: number;
}

export const useFetchMembers = ({ eventId, setMembers }: FetchMembersProps) => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  return useCallback(async () => {
    const res = await fetch(
      `${apiEndpoint}/api/v1/members/?event_id=${eventId}`,
    );
    const data = await res.json();
    setMembers(
      (data as MemberResponse[]).map((m) => ({
        id: m.member_id,
        name: m.name,
        dbId: m.id,
      })),
    );
  }, [eventId, setMembers]);
};
