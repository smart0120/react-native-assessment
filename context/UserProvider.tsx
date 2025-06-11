// src/shared-components/providers/UserProvider.tsx

import { Pick } from "@/models/game";
import { User } from "@/models/user";
import { getUserPicks, getUserProfile } from "@/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextValue {
  profile: User | null;
  picks: Pick[];
  winCount: number;
  lossCount: number;
  balance: number;
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  profile: null,
  picks: [],
  winCount: 0,
  lossCount: 0,
  balance: 0,
  loading: true,
  refresh: async () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userId = "user-123";

  const [profile, setProfile] = useState<User | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [loading, setLoading] = useState(true);

  const winCount = picks.filter((p) => p.result === "win").length;
  const lossCount = picks.filter((p) => p.result === "loss").length;
  const balance = profile?.balance ?? 0;

  const loadData = async () => {
    setLoading(true);
    try {
      const [usr, history] = await Promise.all([
        getUserProfile(userId),
        getUserPicks(userId),
      ]);
      setProfile(usr);
      setPicks(history);
      await AsyncStorage.setItem("@user_picks", JSON.stringify(history));
    } catch {
      const stored = await AsyncStorage.getItem("@user_picks");
      if (stored) setPicks(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadData();
  }, [userId]);

  const refresh = async () => {
    if (!userId) return;
    const history = await getUserPicks(userId);
    setPicks(history);
    await AsyncStorage.setItem("@user_picks", JSON.stringify(history));
  };

  return (
    <UserContext.Provider
      value={{ profile, picks, winCount, lossCount, balance, loading, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
