import AsyncStorage from "@react-native-async-storage/async-storage";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { Scene, GameState } from "../types/game";

import { addItemsToInventory, applyDeltaStats, clamp } from "../utils/game";

import { initialScene } from "../states/initialScene";
import { initialStats } from "../states/initialStats";
import { initialSkills } from "../states/initialSkills";
import { initialInventory } from "../states/initialInventory";
import { buildScenePrompt } from "../utils/buildScenePrompt";
import { requestGigaChatScene } from "../api/gigachat";
import { parseJsonFromText } from "../utils/parseJsonFromText";

const STORAGE_KEY = "gameState";

const initialState: GameState = {
  history: [],
  currentScene: initialScene,
  stats: initialStats,
  skills: initialSkills,
  day: 1,
  loading: false,
  error: undefined,
  inventory: initialInventory,
};

export const saveGameState = createAsyncThunk<void, void, { state: RootState }>(
  "game/saveGameState",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().game;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log("Игра сохранена");
    } catch (err) {
      console.error("Ошибка сохранения игры:", err);
    }
  }
);

export const loadGameState = createAsyncThunk<GameState | null, void>(
  "game/loadGameState",
  async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        console.log("Сохранёнка загружена");
        return JSON.parse(saved) as GameState;
      }
      return null;
    } catch (err) {
      console.error("Ошибка загрузки игры:", err);
      return null;
    }
  }
);

export const fetchNextScene = createAsyncThunk<
  Scene,
  string,
  { state: RootState; dispatch: AppDispatch }
>("game/fetchNextScene", async (userInput, thunkAPI) => {
  const state = thunkAPI.getState();
  const { currentScene, history, stats } = state.game;
  const recentScenes = [...history.slice(-4), currentScene];

  const prompt = buildScenePrompt(userInput, recentScenes, stats);

  try {
    const responseText = await requestGigaChatScene(prompt);
    const sceneJson = parseJsonFromText(responseText);

    if (!sceneJson) {
      return thunkAPI.rejectWithValue("Не удалось извлечь JSON из ответа");
    }

    return sceneJson as Scene;
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return thunkAPI.rejectWithValue("Ошибка соединения с сервером");
  }
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    undoScene(state) {
      if (state.history.length > 0) {
        state.currentScene = state.history.pop()!;
      }
    },
    resetGame(state) {
      state.history = [];
      state.currentScene = initialScene;
      state.stats = initialStats;
      state.day = 1;
      state.inventory = initialInventory;
      state.error = undefined;
      state.loading = false;
    },
    useItem(state, action: PayloadAction<string>) {
      const item = state.inventory.items.find(
        (i) => i.title === action.payload
      );
      if (!item || item.quantity === 0) return;

      if (item.deltaStats) {
        const ds = item.deltaStats;
        state.stats.health = clamp(
          state.stats.health + (ds.hp_increase ?? 0) - (ds.hp_reduce ?? 0),
          0,
          100
        );
        state.stats.mana = clamp(
          state.stats.mana + (ds.mp_increase ?? 0) - (ds.mp_reduce ?? 0),
          0,
          100
        );
        state.stats.satiety = clamp(
          state.stats.satiety +
            (ds.satiety_increase ?? 0) -
            (ds.satiety_reduce ?? 0),
          0,
          100
        );
        state.stats.energy = clamp(
          state.stats.energy +
            (ds.energy_increase ?? 0) -
            (ds.energy_reduce ?? 0),
          0,
          100
        );
        if (ds.level_up && ds.level_up > 0) {
          state.stats.level += ds.level_up;
        }
      }

      item.quantity -= 1;
      if (item.quantity < 0) item.quantity = 0;

      state.currentScene.text += `\n\nВы использовали предмет: ${item.title}. ${item.description}`;

      if (item.fatal) {
        state.stats.health = 0;
        state.currentScene.text += `\n\nЭтот предмет был смертельным. Вы погибли.`;
        state.currentScene.fatal = true;
      }
    },
    useSkill(state, action: PayloadAction<string>) {
      const skill = state.skills[action.payload];

      if (!skill) {
        state.currentScene.text += `\n\nВы попытались использовать неизвестный скилл.`;
        return;
      }

      if (state.stats.mana < skill.manaCost) {
        state.currentScene.text += `\n\nНедостаточно маны для использования скилла "${skill.name}".`;
        return;
      }

      state.stats.mana = clamp(state.stats.mana - skill.manaCost, 0, 100);
      state.currentScene.text += `\n\nВы использовали скилл "${skill.name}": ${skill.description}`;
    },
    useRest(state) {
      state.stats.energy = clamp(state.stats.energy + 30, 0, 100);
      state.currentScene.text += `\n\nВы немного отдохнули и восполнили энергию`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextScene.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchNextScene.fulfilled, (state, action) => {
        state.loading = false;
        state.stats.satiety = clamp(state.stats.satiety - 5, 0, 100);
        state.stats.energy = clamp(state.stats.energy - 5, 0, 100);

        if (state.stats.satiety <= 0) {
          state.stats.health = clamp(state.stats.health - 5, 0, 100);
        }

        if (state.stats.energy <= 0) {
          state.stats.health = clamp(state.stats.health - 5, 0, 100);
        }

        const scenesPlayed = state.history.length + 1;
        if (scenesPlayed % 5 === 0) {
          state.day += 1;
        }

        state.history.push(state.currentScene);
        state.currentScene = action.payload;

        const delta = action.payload.deltaStats ?? {};
        state.stats = applyDeltaStats(state.stats, delta);

        if (
          state.stats.satiety > 0 &&
          state.stats.satiety < 100 &&
          state.stats.energy > 0 &&
          state.stats.energy < 100
        ) {
          state.stats.mana = clamp(state.stats.mana + 1, 0, 100);
        }

        if (action.payload.itemsFound && action.payload.itemsFound.length > 0) {
          const { updatedInventory, logText } = addItemsToInventory(
            state.inventory,
            action.payload.itemsFound
          );
          state.inventory = updatedInventory;
          state.currentScene.text += logText;
        }
      })
      .addCase(fetchNextScene.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadGameState.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      });
  },
});

export const { undoScene, resetGame, useItem, useSkill, useRest } =
  gameSlice.actions;

export default gameSlice.reducer;
