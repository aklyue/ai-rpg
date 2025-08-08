import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { useAppSelector } from "../../store/hooks";
import TypewriterText from "../../components/TypewriterText";
import useGameActions from "../../hooks/useGameActions";
import ThreeDotsLoading from "../../components/UI/ThreeDotsLoading";
import Backpack from "../../assets/ui/backpack.svg";
import Book from "../../assets/ui/book.svg";
import Bed from "../../assets/ui/bed.svg";

interface GameScreenProps {
  text: string;
  sceneId: string;
  stats: {
    health: number;
    mana: number;
    satiety: number;
    energy: number;
    level: number;
  };
  onUserInput: (input: string) => void;
  loading?: boolean;
  error?: string;
  onExitToMenu: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  text,
  sceneId,
  stats,
  onUserInput,
  loading,
  error,
  onExitToMenu,
}) => {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });
  const { day } = useAppSelector((state) => state.game);
  const { speed } = useAppSelector((state) => state.type);

  const {
    inputText,
    setInputText,
    openInventory,
    openSkills,
    rest,
    handleSend,
  } = useGameActions({
    stats,
    onUserInput,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <View style={styles.topPanel}>
        <View style={styles.topLeftButtonsContainer}>
          <TouchableOpacity onPress={onExitToMenu} style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: "PressStart2P" }]}>
              Выйти в меню
            </Text>
          </TouchableOpacity>

          <View style={styles.uiBtns}>
            <TouchableOpacity onPress={openInventory} style={styles.button}>
              <Backpack width={30} height={30} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={openSkills} style={styles.button}>
              <Book width={30} height={30} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={rest} style={styles.button}>
              <Bed width={30} height={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.topRightStats}>
          <View style={styles.statBarWrapper}>
            <Text
              style={[
                styles.statLabel,
                { fontFamily: "PressStart2P", fontSize: 8 },
              ]}
            >
              HP
            </Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${stats.health}%`, backgroundColor: "#be0000" },
                ]}
              />
            </View>
          </View>

          <View style={styles.statBarWrapper}>
            <Text
              style={[
                styles.statLabel,
                { fontFamily: "PressStart2P", fontSize: 8 },
              ]}
            >
              Mana
            </Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${stats.mana}%`, backgroundColor: "blue" },
                ]}
              />
            </View>
          </View>

          <View style={styles.statBarWrapper}>
            <Text
              style={[
                styles.statLabel,
                { fontFamily: "PressStart2P", fontSize: 8 },
              ]}
            >
              Hunger
            </Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${stats.satiety}%`, backgroundColor: "yellow" },
                ]}
              />
            </View>
          </View>

          <View style={styles.statBarWrapper}>
            <Text
              style={[
                styles.statLabel,
                { fontFamily: "PressStart2P", fontSize: 8 },
              ]}
            >
              Energy
            </Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${stats.energy}%`, backgroundColor: "lightblue" },
                ]}
              />
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View style={styles.levelContainer}>
              <Text
                style={[
                  styles.levelText,
                  { fontFamily: "PressStart2P", fontSize: 8 },
                ]}
              >
                Lvl: {stats.level}
              </Text>
            </View>
            <View style={styles.levelContainer}>
              <Text
                style={[
                  styles.levelText,
                  { fontFamily: "PressStart2P", fontSize: 8 },
                ]}
              >
                Day: {day}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.textContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        {loading ? (
          <ThreeDotsLoading />
        ) : error ? (
          <Text style={styles.errorText}>Ошибка: {error}</Text>
        ) : (
          <TypewriterText fullText={text} speed={speed} sceneId={sceneId} />
        )}
      </ScrollView>

      <View style={styles.keyboardAvoid}>
        {!loading && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { fontFamily: "PressStart2P", fontSize: 10 },
              ]}
              autoComplete="off"
              autoCorrect={false}
              keyboardType="default"
              spellCheck={false}
              importantForAutofill="no"
              disableFullscreenUI={true}
              placeholder="Введите действие"
              placeholderTextColor="#888"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              editable={!loading}
              keyboardAppearance="dark"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={loading || inputText.trim() === ""}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  { fontFamily: "PressStart2P", fontSize: 10 },
                ]}
              >
                Отправить
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#121212",
  },

  topPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },

  topLeftButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 12,
  },

  uiBtns: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  button: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 1,
  },

  topRightStats: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },

  statBarWrapper: {
    width: 150,
    marginBottom: 10,
  },

  statLabel: {
    color: "#fff",
    marginBottom: 2,
    fontSize: 10,
  },

  statBarBackground: {
    width: "100%",
    height: 15,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  statBarFill: {
    height: "100%",
  },

  levelContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#a0a0a0",
    justifyContent: "center",
    alignItems: "center",
  },

  levelText: {
    color: "#fff",
    fontSize: 14,
  },

  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  scrollContentContainer: {
    paddingBottom: 30,
  },

  text: {
    color: "#fff",
    lineHeight: 25,
    fontSize: 16,
    textAlign: "center",
  },

  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },

  keyboardAvoid: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#444",
    backgroundColor: "#121212",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#111",
    color: "#fff",
    paddingHorizontal: 8,
    height: 40,
    width: 250,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
  },

  sendButtonText: {
    color: "#fff",
  },
});

export default GameScreen;
