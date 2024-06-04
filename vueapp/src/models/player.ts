import { Level } from "../models/level";
export class Player {
  name: string;
  avatar_url: string;
  is_guest: boolean;
  level: Level;

  constructor(name, level, is_guest = true, avatar_url = "") {
    this.name = name;
    this.avatar_url = avatar_url;
    this.is_guest = is_guest;
    this.level = level;
  }
}

export class Member extends Player {
  id: number;

  // The id of the challenge this member is currently participating in
  challenge_id: number;

  constructor(id, name, level, avatar_url = "") {
    super(name, level, false, avatar_url);
    this.id = id;
  }
}
