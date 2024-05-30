export class Player {
  name: string;
  avatar_url: string;
  isGuest: boolean = false;
  challengeId: number;

  constructor(name, avatar_url = null) {
    this.name = name;
    this.avatar_url = avatar_url;
  }
}
