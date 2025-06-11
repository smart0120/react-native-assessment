// hooks/useGames.ts
// Custom hook to fetch games list

import { useEffect, useState } from "react";
import { Game } from "../models/game";
import { getGames } from "../services/gameService";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      load();
    }, 10000); // poll every 10 sec
    return () => clearInterval(interval);
  }, []);

  return { games, loading, error };
};
