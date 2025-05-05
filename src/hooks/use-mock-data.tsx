
import { useState } from "react";
import { Friend, FriendRequest, OnlinePlayer, PartyMember } from "../types/friend";

export const useMockData = () => {
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      name: "Elrond",
      level: 45,
      class: "Mage",
      status: "online",
      activity: "In Stormwind City"
    },
    {
      id: "2",
      name: "Gandalf",
      level: 50,
      class: "Mage",
      status: "in-game",
      activity: "Battling in Deadmines"
    },
    {
      id: "3",
      name: "Legolas",
      level: 42,
      class: "Ranger",
      status: "online",
      activity: "Crafting items"
    },
    {
      id: "4",
      name: "Gimli",
      level: 39,
      class: "Warrior",
      status: "offline",
      lastSeen: "2 days ago"
    },
    {
      id: "5",
      name: "Aragorn",
      level: 48,
      class: "Warrior",
      status: "away",
      activity: "AFK - Training"
    },
    {
      id: "6",
      name: "Frodo",
      level: 33,
      class: "Ranger",
      status: "offline",
      lastSeen: "5 hours ago"
    },
    {
      id: "7",
      name: "Galadriel",
      level: 52,
      class: "Mage",
      status: "offline",
      lastSeen: "3 days ago"
    }
  ]);

  const [friendRequests] = useState<FriendRequest[]>([
    {
      id: "101",
      name: "Boromir",
      level: 37,
      class: "Warrior"
    },
    {
      id: "102",
      name: "Arwen",
      level: 43,
      class: "Ranger"
    }
  ]);

  const [onlinePlayers] = useState<OnlinePlayer[]>([
    {
      id: "201",
      name: "Saruman",
      level: 51,
      class: "Mage"
    },
    {
      id: "202",
      name: "Eowyn",
      level: 38,
      class: "Warrior"
    },
    {
      id: "203",
      name: "Faramir",
      level: 40,
      class: "Ranger"
    },
    {
      id: "204",
      name: "Theoden",
      level: 45,
      class: "Warrior"
    },
    {
      id: "205",
      name: "Merry",
      level: 32,
      class: "Ranger"
    }
  ]);

  const [party] = useState<PartyMember[]>([
    {
      id: "1",
      name: "Elrond",
      level: 45,
      class: "Mage",
      role: "DPS",
      health: 85,
      mana: 72,
      isLeader: true
    },
    {
      id: "2",
      name: "Gandalf",
      level: 50,
      class: "Mage",
      role: "Healer",
      health: 95,
      mana: 84,
      isLeader: false
    },
    {
      id: "3",
      name: "Legolas",
      level: 42,
      class: "Ranger",
      role: "DPS",
      health: 78,
      mana: 65,
      isLeader: false
    }
  ]);

  return { friends, friendRequests, party, onlinePlayers };
};
