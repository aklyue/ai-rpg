import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  DeathScreenNavigationProp,
  InventoryScreenNavigationProp,
  SkillsScreenNavigationProp,
} from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useRest } from "../../store/slices/gameSlice";

interface useGameActionsProps {
  stats: {
    health: number;
    mana: number;
    satiety: number;
    energy: number;
    level: number;
  };
  onUserInput: (input: string) => void;
}

export const useGameActions = ({ stats, onUserInput }: useGameActionsProps) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const navigation = useNavigation<
    | DeathScreenNavigationProp
    | InventoryScreenNavigationProp
    | SkillsScreenNavigationProp
  >();
  useEffect(() => {
    if (stats.health === 0) {
      navigation.navigate("Death");
    }
  }, [stats.health]);

  const handleSend = () => {
    if (inputText.trim()) {
      onUserInput(inputText.trim());
      setInputText("");
    }
  };

  const openInventory = () => {
    navigation.navigate("Inventory");
  };

  const openSkills = () => {
    navigation.navigate("Skills");
  };

  const rest = () => {
    dispatch(useRest());
  };

  return {
    inputText,
    setInputText,
    openInventory,
    openSkills,
    rest,
    handleSend,
  };
};
