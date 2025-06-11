// src/components/BalanceCard.tsx
import MoneyIcon from "@/assets/images/icons/money.svg";
import SadfaceIcon from "@/assets/images/icons/sad_face.svg";
import TrophyIcon from "@/assets/images/icons/trophy.svg";
import Typography from "@/components/ui/Typography";
import { useUser } from "@/context/UserProvider";
import React, { FC, memo } from "react";
import { View } from "react-native";

const ICON_SIZE = 24;
const ICON_COLOR = "yellow";

interface StatRowProps {
  Icon: FC<{ width: number; height: number; color: string }>;
  label: string;
  value: string | number;
}

const StatRow: FC<StatRowProps> = memo(({ Icon, label, value }) => (
  <View className="flex-row items-center space-x-3 py-2">
    <Icon width={ICON_SIZE} height={ICON_SIZE} color={ICON_COLOR} />
    <Typography variant="body" className="flex-1 text-primary ml-2">
      {label}
    </Typography>
    <Typography variant="heading" className=" text-primary">
      {value}
    </Typography>
  </View>
));

const BalanceCard: FC = () => {
  const { winCount, lossCount, balance } = useUser();

  const stats = [
    {
      key: "balance",
      Icon: MoneyIcon,
      label: "Your balance",
      value: `$${balance.toFixed(2)}`,
    },
    { key: "wins", Icon: TrophyIcon, label: "Wins", value: winCount },
    { key: "losses", Icon: SadfaceIcon, label: "Losses", value: lossCount },
  ] as const;

  return (
    <View className="bg-secondary rounded-lg p-4 mt-5">
      {stats.map(({ key, Icon, label, value }) => (
        <StatRow key={key} Icon={Icon} label={label} value={value} />
      ))}
    </View>
  );
};

export default memo(BalanceCard);
