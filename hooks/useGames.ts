// hooks/useGames.ts
// Custom hook to fetch games list

import { useEffect, useState } from "react";
import { Game } from "../models/game";
import { getGames } from "../services/gameService";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getGames();
        setGames(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { games, loading, error };
};
