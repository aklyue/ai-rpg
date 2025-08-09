import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Skills from "../../components/Skills";
import { useNavigation } from "@react-navigation/native";
import { DeathScreenNavigationProp } from "../../navigation/types";
import { useFonts } from "expo-font";
import SoundManager from "../../preload/soundManager";

const SkillsScreen: React.FC = () => {
  const navigation = useNavigation<DeathScreenNavigationProp>();

  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

  const goBack = () => {
    SoundManager.playClickSound();
    navigation.navigate("Game");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topLeft}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text
            style={[
              styles.buttonText,
              { fontFamily: "PressStart2P", fontSize: 10 },
            ]}
          >
            ← Назад
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skillsContainer}>
        <Skills />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  header: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  topLeft: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  skillsContainer: {
    marginTop: 20,
    flex: 1,
  },
});

export default SkillsScreen;
