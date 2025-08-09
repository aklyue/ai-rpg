import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useSelector, useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import { useChangeSpeed } from "../../store/slices/typeSlice";
import { RootState } from "../../store";
import SoundManager from "../../preload/soundManager";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const marks = [10, 25, 50, 75, 100];

const SettingsScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const reduxSpeed = useSelector((state: RootState) => state.type.speed);

  const { screen } = route.params ?? {};

  const [localSpeed, setLocalSpeed] = useState(reduxSpeed);

  useEffect(() => {
    setLocalSpeed(reduxSpeed);
  }, [reduxSpeed]);

  const handleSlidingComplete = (value: number) => {
    dispatch(useChangeSpeed(value));
  };

  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

  const goBack = () => {
    SoundManager.playClickSound();
    if (screen) {
      navigation.navigate(screen);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

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

      <Text style={[styles.title, { fontFamily: "PressStart2P" }]}>
        Настройки
      </Text>

      <Text style={[styles.label, { fontFamily: "PressStart2P" }]}>
        Text offset: {localSpeed}
      </Text>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={10}
        maximumValue={100}
        step={5}
        value={localSpeed}
        minimumTrackTintColor="#a0a0a0"
        maximumTrackTintColor="#555"
        thumbTintColor="#fff"
        onValueChange={(value) => setLocalSpeed(value)}
        onSlidingComplete={handleSlidingComplete}
      />

      {/* Отметки */}
      <View style={styles.marksContainer}>
        {marks.map((mark) => (
          <Text
            key={mark}
            style={[
              styles.markLabel,
              {
                color: mark === localSpeed ? "#fff" : "#888",
                fontFamily: "PressStart2P",
              },
            ]}
          >
            {mark}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
    paddingTop: 80,
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
  title: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 20,
  },
  label: {
    fontSize: 10,
    color: "#fff",
    marginBottom: 10,
  },
  marksContainer: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  markLabel: {
    fontSize: 10,
  },
});

export default SettingsScreen;
