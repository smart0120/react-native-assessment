// services/gameService.ts
// Mock API service for games and user picks

import { mockGames } from "@/utils/db";
import { Game, Pick, User } from "../models/game";

// In-memory storage for picks and a single mock user
let mockPicks: Pick[] = [];
const mockUser: User = {
  id: "u1",
  username: "player1",
  virtualBalance: 1000,
  picksHistory: [],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGames = async (): Promise<Game[]> => {
  await delay(1000);
  randomUpdate();
  return mockGames;
};
export const getGameById = async (id: string): Promise<Game | undefined> => {
  await delay(1000);
  return mockGames.find((game) => game.id === id);
};

export const getUser = async (userId: string): Promise<User> => {
  await delay(1000);
  return { ...mockUser, picksHistory: [...mockPicks] };
};

export const submitPick = async (pick: Pick): Promise<Pick> => {
  await delay(1000);
  mockPicks.push(pick);
  mockUser.picksHistory = [...mockPicks];
  // Optional: adjust virtual balance logic here
  return pick;
};

const randomUpdate = () => {
  mockGames.forEach((game) => {
    if (game.status === "upcoming" && Math.random() < 0.3) {
      game.status = "live";
    } else if (game.status === "live" && Math.random() < 0.3) {
      game.status = "completed";
    }
    // Optional: simulate live score updates
    if (game.status === "live") {
      game.score = {
        home: Math.floor(Math.random() * 30),
        away: Math.floor(Math.random() * 30),
      };
    }
  });
};
