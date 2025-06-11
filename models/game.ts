// models/game.ts

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl?: string;
}

export interface Score {
  home: number;
  away: number;
}

export type GameStatus = "upcoming" | "live" | "completed";

export interface Odds {
  spread: number; // e.g. -7 or +3.5
  overUnder?: number;
  moneyline?: {
    home: number;
    away: number;
  };
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string; // ISO date string
  status: GameStatus;
  score?: Score;
  odds: Odds;
}

export interface Pick {
  gameId: string;
  userId: string;
  selection: "home" | "away" | "spread";
  spread?: number; // copy of odds.spread at pick time
  timestamp: string; // ISO date string
  result: 'win' | 'loss' 
}

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  virtualBalance: number;
  picksHistory?: Pick[];
}
