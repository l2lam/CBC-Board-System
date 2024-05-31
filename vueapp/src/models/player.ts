export class Player {
  name: string;
  avatar_url: string;

  constructor(name, avatar_url = "") {
    this.name = name;
    this.avatar_url = avatar_url;
  }
}

export class Member extends Player {
  id: number;

  // The id of the challenge this member is currently participating in
  challenge_id: number;

  constructor(id, name, avatar_url = "") {
    super(name, avatar_url);
    this.id = id;
  }
}
