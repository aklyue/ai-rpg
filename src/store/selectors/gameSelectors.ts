import { RootState } from "../index";

export const selectCurrentScene = (state: RootState) => state.game.currentScene;

export const selectStats = (state: RootState) => state.game.stats ?? {};

export const selectText = (state: RootState) =>
  state.game.currentScene?.text ?? "";

export const selectBackground = (state: RootState) =>
  state.game.currentScene?.background ?? null;
