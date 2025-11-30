type MemberId = number;

interface Member {
  id: MemberId;
  dbId?: number;
  name: string;
}

export type { Member, MemberId };
