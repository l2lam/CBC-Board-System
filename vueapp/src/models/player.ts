import { Level } from "./level";

// A Player is someone that is present at the club session and can play
export class Player {
  name: string;
  avatarURL: string;
  isGuest: boolean;
  level?: Level;
  id?: number;

  constructor(name, level?: Level, is_guest = true, avatar_url = "") {
    this.id = undefined;
    this.name = name;
    this.avatarURL = avatar_url;
    this.isGuest = is_guest;
    this.level = level;
  }

  toString(): string {
    return this.name;
  }
}

// A Member is a registered club member
export class Member extends Player {
  isActive: boolean;

  // The id of the challenge this member is currently participating in
  challenge_id?: number;

  constructor(
    id?: number,
    name = "",
    level?: Level,
    avatar_url = "",
    isActive = true
  ) {
    super(name, level, false, avatar_url);
    this.id = id;
    this.isActive = isActive;
  }
}
