import { Level } from "../models/level";

// A Player is someone that is present at the club session and can play
export class Player {
  name: string;
  avatarURL: string;
  isGuest: boolean;
  level?: Level;

  constructor(name, level = undefined, is_guest = true, avatar_url = "") {
    this.name = name;
    this.avatarURL = avatar_url;
    this.isGuest = is_guest;
    this.level = level;
  }
}

// A Member is a registered club member
export class Member extends Player {
  id: number;

  // The id of the challenge this member is currently participating in
  challenge_id?: number;

  constructor(id, name, level = undefined, avatar_url = "") {
    super(name, level, false, avatar_url);
    this.id = id;
  }
}
