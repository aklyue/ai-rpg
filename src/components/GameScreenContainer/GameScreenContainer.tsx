import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GameScreen from "../../screens/GameScreen";
import { fetchNextScene, resetGame } from "../../store/slices/gameSlice";
import { useNavigation } from "@react-navigation/native";
import { GameScreenNavigationProp } from "../../navigation/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const GameScreenContainer = () => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { text, sceneId } = useAppSelector((state) => state.game.currentScene);

  const { stats } = useAppSelector((state) => state.game);
  const loading = useAppSelector((state) => state.game.loading);
  const error = useAppSelector((state) => state.game.error);

  const onUserInput = (userInput: string) => {
    if (userInput.trim()) {
      dispatch(fetchNextScene(userInput.trim()));
    }
  };

  const onExitToMenu = () => {
    navigation.navigate("Home");
  };

  return (
    <GameScreen
      text={text}
      sceneId={sceneId}
      stats={stats}
      onUserInput={onUserInput}
      loading={loading}
      error={error}
      onExitToMenu={onExitToMenu}
    />
  );
};

export default GameScreenContainer;
