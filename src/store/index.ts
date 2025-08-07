import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import tokenReducer from "./slices/tokenSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
