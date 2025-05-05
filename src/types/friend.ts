
export interface Friend {
  id: string;
  name: string;
  level: number;
  class: "Warrior" | "Mage" | "Ranger";
  status: "online" | "offline" | "in-game" | "away";
  activity?: string;
  lastSeen?: string;
}

export interface FriendRequest {
  id: string;
  name: string;
  level: number;
  class: "Warrior" | "Mage" | "Ranger";
}

export interface OnlinePlayer {
  id: string;
  name: string;
  level: number;
  class: "Warrior" | "Mage" | "Ranger";
}

export interface PartyMember {
  id: string;
  name: string;
  level: number;
  class: "Warrior" | "Mage" | "Ranger";
  role: "Tank" | "DPS" | "Healer";
  health: number;
  mana: number;
  isLeader: boolean;
}
