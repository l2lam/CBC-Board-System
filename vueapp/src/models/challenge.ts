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

  toString() {
    let result = `${this.winners
      .map((x) => x.name)
      .join(" & ")} def ${this.losers.map((x) => x.name).join(" & ")}`;
    if (this.score) return `${result} by a score of ${this.score}`;
    return result;
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
  }

  // Determine state of the challenge
  state(): ChallengeState {
    // Check the number of wins and loses the challenger has to determine success
    var wins = this.scores.filter((score) =>
      score.winners.includes(this.challenger)
    ).length;

    // The challenger is mathematically unsuccessful if there are not enough games left to acquire the number of wins necessary
    var gamesRemaining = this.maxGames - this.scores.length;
    var winsNeeded = this.numberOfWinsToBeSuccessful - wins;
    console.log(`Wins: ${wins}, GR: ${gamesRemaining}, WN: ${winsNeeded}`);
    if (gamesRemaining < winsNeeded) return ChallengeState.UNSUCCESSFUL;
    if (gamesRemaining <= 0 && wins >= this.numberOfWinsToBeSuccessful)
      return ChallengeState.SUCCESSFUL;
    return ChallengeState.INCOMPLETE;
  }

  // Get the incumbent that should be knocked down (because they lost every game)
  incumbentThatIsKnockedDown(): Member | undefined {
    if (this.scores.length >= this.maxGames) {
      for (const incumbent of this.incumbents) {
        if (this.scores.every((score) => score.losers.includes(incumbent))) {
          console.log(`Member to be knocked down is ${incumbent.name}`);
          return incumbent;
        }
      }
    }
    return undefined;
  }
}
