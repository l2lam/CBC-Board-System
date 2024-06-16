import { Level } from "./level";
import { useLevelStore } from "../stores/levelStore"

// A Player is someone that is present at the club session and can play
export class Player {
  name: string;
  avatarURL: string;
  isGuest: boolean;
  level?: Level;

  constructor(name, level?: Level, is_guest = true, avatar_url = "") {
    this.name = name;
    this.avatarURL = avatar_url;
    this.isGuest = is_guest;
    this.level = level;
  }

  static generateMockPlayers(n: number, label: string = "Mock Player", start: number = 1): Player[] {
    var levelStore = useLevelStore();
    levelStore.loadLevels();
    return Array.from({ length: n }, (v, i) => i).map(i => new Player(`${label} ${i + start}`, levelStore.allLevels[i % levelStore.allLevels.length]));
  }
}

// A Member is a registered club member
export class Member extends Player {
  id: number;

  // The id of the challenge this member is currently participating in
  challenge_id?: number;

  constructor(id, name, level?: Level, avatar_url = "") {
    super(name, level, false, avatar_url);
    this.id = id;
  }

  static generateMockMembers(n: number, label: string = "Mock Member", start: number = 1): Member[] {
    var levelStore = useLevelStore();
    levelStore.loadLevels();
    return Array.from({ length: n }, (v, i) => i).map(i => new Member(i + start, `${label} ${i + start}`, levelStore.allLevels[i % levelStore.allLevels.length]));
  }
}
