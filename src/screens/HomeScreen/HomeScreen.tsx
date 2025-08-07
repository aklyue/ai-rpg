import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { useFonts } from "expo-font";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

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
        onPress={() => navigation.navigate("Game")}
        style={styles.startBtn}
      >
        <Text style={[styles.startBtnText, { fontFamily: "PressStart2P" }]}>
          Начать
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={styles.startBtn}
      >
        <Text style={[styles.startBtnText, { fontFamily: "PressStart2P" }]}>
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
  startBtn: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  startBtnText: {
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
