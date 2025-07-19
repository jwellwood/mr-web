export interface IAward {
  _id: string;
  seasonId: string;
  awardName: string;
  winners: { name?: string; _id: string }[] | string[];
  awardValue?: number;
  comment?: string;
}

export interface IAwardByPlayer {
  season: string;
  awardName: string;
  awardValue?: number;
  comment?: string;
}
