import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSkill } from "../../store/slices/gameSlice";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { GameScreenNavigationProp } from "../../navigation/types";

const Skills: React.FC = () => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const skills = useSelector((state: RootState) => state.game.skills);
  const mana = useSelector((state: RootState) => state.game.stats.mana);
  const dispatch = useDispatch<AppDispatch>();

  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

  const handleUseSkill = (key: string) => {
    dispatch(useSkill(key));
    navigation.navigate("Game");
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[styles.header, { fontFamily: "PressStart2P" }]}>
        Доступные скиллы
      </Text>
      {Object.entries(skills).map(([key, skill]) => (
        <View key={key} style={styles.skillCard}>
          <Text style={[styles.title, { fontFamily: "PressStart2P" }]}>
            {skill.name}
          </Text>
          <Text
            style={[
              styles.description,
              { fontFamily: "PressStart2P", fontSize: 8 },
            ]}
          >
            {skill.description}
          </Text>
          <Text
            style={[
              styles.manaCost,
              { fontFamily: "PressStart2P", fontSize: 8 },
            ]}
          >
            Мана: {skill.manaCost}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              mana < skill.manaCost && styles.buttonDisabled,
            ]}
            onPress={() => handleUseSkill(key)}
            disabled={mana < skill.manaCost}
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: "PressStart2P", fontSize: 8 },
              ]}
            >
              Использовать
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 80,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  skillCard: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 12,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 6,
  },
  description: {
    color: "#aaa",
    marginBottom: 6,
  },
  manaCost: {
    color: "#888",
    marginBottom: 8,
  },
  button: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default Skills;
