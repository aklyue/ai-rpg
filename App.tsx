import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import MainNavigator from "./src/navigation/MainNavigator";
import SoundManager from "./src/preload/soundManager";
import TypewriterSoundManager from "./src/preload/typewriterSoundManager";

export default function App() {
  useEffect(() => {
    SoundManager.loadSound();
    TypewriterSoundManager.loadSound();

    return () => {
      SoundManager.unload();
      TypewriterSoundManager.unload();
    };
  }, []);
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
