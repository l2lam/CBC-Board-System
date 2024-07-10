import { Challenge } from "../models/challenge";
import { Game } from "../models/game";
import { Level } from "../models/level";
import { Member } from "../models/player";

export let mockLevel1 = new Level(0, "New");
export let mockLevel2 = new Level(1, "Black");
export let mockLevel3 = new Level(2, "Green");
export let mockLevel4 = new Level(3, "Blue");
export let mockLevel5 = new Level(4, "Red");

export let mockMember1 = new Member(900, "Mock Member900", mockLevel3);
export let mockMember2 = new Member(901, "Mock Member901", mockLevel4);
export let mockMember3 = new Member(902, "Mock Member902", mockLevel4);
export let mockMember4 = new Member(903, "Mock Member903", mockLevel4);

export let mockChallenge1 = new Challenge({
  id: 1,
  date: new Date(),
  targetLevel: mockLevel4,
  challenger: mockMember1,
  incumbents: [mockMember2, mockMember3, mockMember4],
});

export let mockChallengeGame1 = new Game(
  [mockChallenge1.challenger, ...mockChallenge1.incumbents],
  mockChallenge1
);
