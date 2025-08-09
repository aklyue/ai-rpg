import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { useFonts } from "expo-font";
import { useAppDispatch } from "../../store/hooks";
import { loadGameState, resetGame } from "../../store/slices/gameSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SoundManager from "../../preload/soundManager";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    const checkSave = async () => {
      const saved = await AsyncStorage.getItem("gameState");
      setHasSave(!!saved);
    };
    checkSave();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { fontFamily: "PressStart2P", fontSize: 14 }]}
      >
        Добро пожаловать в AI RPG!
      </Text>
      <TouchableOpacity
        onPress={() => {
          SoundManager.playClickSound();
          navigation.navigate("Game");
          dispatch(resetGame());
        }}
        style={styles.btn}
      >
        <Text style={[styles.btnText, { fontFamily: "PressStart2P" }]}>
          Новая игра
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          SoundManager.playClickSound();
          navigation.navigate("Game");
        }}
        style={[styles.btn, !hasSave && styles.btnDisabled]}
        disabled={!hasSave}
      >
        <Text style={[styles.btnText, { fontFamily: "PressStart2P" }]}>
          Продолжить
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          SoundManager.playClickSound();
          navigation.navigate("Settings", { screen: "Home" });
        }}
        style={styles.btn}
      >
        <Text style={[styles.btnText, { fontFamily: "PressStart2P" }]}>
          Настройки
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  btn: {
    borderWidth: 2,
    width: "50%",
    borderColor: "#a0a0a0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
