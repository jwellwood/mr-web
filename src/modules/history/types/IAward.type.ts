export interface IAward {
  seasonId: string;
  awardName: string;
  winners: string[] | { name: string; _id: string }[];
  awardValue?: number;
  comment?: string;
}

export interface IAwardByPlayer {
  season: string;
  awardName: string;
  awardValue?: number;
  comment?: string;
}
