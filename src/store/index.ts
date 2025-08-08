import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import tokenReducer from "./slices/tokenSlice";
import typeeducer from "./slices/typeSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    token: tokenReducer,
    type: typeeducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
