import { Member, Player } from "./player";

export class ChallengeScore {
  score: string;
  winners: Player[];
  losers: Player[];
}

export class Challenge {
  id: number;
  challenger: Member;
  targetLevel;
  incumbents: Member[]; // The members being challenged
  scores: ChallengeScore[];
  isSuccessful: boolean;
  notes: string;
}
