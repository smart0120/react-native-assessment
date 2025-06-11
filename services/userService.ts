import { Pick } from "@/models/game";
import { User } from "@/models/user";

// simple delay helper
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// -- mock data store --
const mockUser: User = {
  id: "user-123",
  name: "Sammie",
  balance: 5000,
  email: "sammie@test.com",
};

let mockPicks: Pick[] = [];

// fetch basic profile
export const getUserProfile = async (userId: string): Promise<User> => {
  await delay(300);
  if (userId === mockUser.id) return mockUser;
  throw new Error("User not found");
};

// fetch history of picks
export const getUserPicks = async (userId: string): Promise<Pick[]> => {
  await delay(300);
  return mockPicks.filter((p) => p.userId === userId);
};

// submit a pick and simulate a result
export const submitPick = async (pick: Pick): Promise<Pick> => {
  await delay(200);
  const result = Math.random() > 0.5 ? "win" : "loss";
  const newPick: Pick = { ...pick, result };
  if (pick.result === "win") {
    mockUser.balance += 1000;
  } else {
    mockUser.balance -= 500;
  }
  mockPicks.push(newPick);
  return newPick;
};
