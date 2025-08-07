import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { HomeScreenNavigationProp } from "../../navigation/types";
import { resetGame } from "../../store/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const DeathScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });
  const { day } = useSelector((state: RootState) => state.game);

  const handleReturnToMenu = () => {
    navigation.navigate("Home");
    dispatch(resetGame());
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Можно добавить фоновую картинку, если нужно */}
      <Text style={[styles.title, { fontFamily: "PressStart2P" }]}>
        Вы погибли
      </Text>

      <Text style={[styles.message, { fontFamily: "PressStart2P" }]}>
        Но каждый конец — это новое начало.
      </Text>

      <Text style={[styles.message, { fontFamily: "PressStart2P" }]}>
        Прожито дней: {day}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleReturnToMenu}>
        <Text style={[styles.buttonText, { fontFamily: "PressStart2P" }]}>
          В главное меню
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#ff4c4c",
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  message: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    letterSpacing: 1,
  },
});

export default DeathScreen;
