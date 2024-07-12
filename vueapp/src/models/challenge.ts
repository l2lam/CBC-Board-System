import { Member } from "./player";

export enum ChallengeState {
  INCOMPLETE,
  SUCCESSFUL,
  UNSUCCESSFUL,
}

export class ChallengeScore {
  date: Date;
  score: string;
  winners: Member[];
  losers: Member[];
  constructor(obj: Partial<ChallengeScore>) {
    Object.assign(this, obj);
  }
}

export class Challenge {
  id: number;
  date: Date;
  challenger: Member;
  targetLevel;
  incumbents: Member[]; // The members being challenged
  scores: ChallengeScore[] = [];
  notes?: string;
  numberOfWinsToBeSuccessful: number = 2;
  maxGames: number = 3;

  constructor(obj: Partial<Challenge>) {
    Object.assign(this, obj);
  }

  registerScore(score: ChallengeScore) {
    this.scores.push(score);

    // TODO check challenge status and adjust member levels as necessary
  }

  // Determine state of the challenge
  state(): ChallengeState {
    // Check the number of wins and loses the challenger has to determine success
    var wins = this.scores.filter((score) =>
      score.winners.includes(this.challenger)
    ).length;
    if (wins > this.numberOfWinsToBeSuccessful)
      return ChallengeState.SUCCESSFUL;

    // The challenger is mathematically unsuccessful if there are not enough games left to acquire the number of wins necessary
    var gamesRemaining = this.maxGames - this.scores.length;
    var winsNeeded = this.numberOfWinsToBeSuccessful - wins;
    if (gamesRemaining < winsNeeded) return ChallengeState.UNSUCCESSFUL;

    return ChallengeState.INCOMPLETE;
  }
}
