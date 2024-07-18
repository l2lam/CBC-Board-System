import { Challenge } from "../models/challenge";
import { Club } from "../models/club";
import { Game } from "../models/game";
import { Level } from "../models/level";
import { Member, Player } from "../models/player";

export const mockClub = new Club(1, "Mock Sport Club");

export const mockLevel1 = new Level(0, "New", 0);
export const mockLevel2 = new Level(1, "Black", 1, "#000000");
export const mockLevel3 = new Level(2, "Green", 2, "#11ff11");
export const mockLevel4 = new Level(3, "Blue", 3, "#1111ff");
export const mockLevel5 = new Level(4, "Red", 4, "#ff1111");
export const allMockLevels = [
  mockLevel1,
  mockLevel2,
  mockLevel3,
  mockLevel4,
  mockLevel5,
];

export const mockMember1 = new Member(900, "Mock Member900", mockLevel3);
export const mockMember2 = new Member(901, "Mock Member901", mockLevel4);
export const mockMember3 = new Member(902, "Mock Member902", mockLevel4);
export const mockMember4 = new Member(903, "Mock Member903", mockLevel4);

export const mockChallenge1 = new Challenge({
  id: 1,
  date: new Date(),
  targetLevel: mockLevel4,
  challenger: mockMember1,
  incumbents: [mockMember2, mockMember3, mockMember4],
});

export const mockChallengeGame1 = new Game(
  [mockChallenge1.challenger, ...mockChallenge1.incumbents],
  mockChallenge1
);

export function generateMockPlayers(
  n: number,
  label: string = "Mock Player",
  start: number = 1
): Player[] {
  return Array.from({ length: n }, (v, i) => i).map(
    (i) =>
      new Player(
        `${label} ${i + start}`,
        allMockLevels[Math.floor(Math.random() * allMockLevels.length)]
      )
  );
}

export function generateMockMembers(
  n: number,
  label: string = "Mock Member",
  start: number = 1
): Member[] {
  return Array.from({ length: n }, (v, i) => i).map(
    (i) =>
      new Member(
        i + start,
        `${label} ${i + start}`,
        allMockLevels[Math.floor(Math.random() * allMockLevels.length)]
      )
  );
}
