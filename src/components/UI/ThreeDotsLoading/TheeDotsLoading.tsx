import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Dot from "../Dot";

export const ThreeDotsLoading = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Dot progress={progress} offset={0} />
      <Dot progress={progress} offset={0.2} />
      <Dot progress={progress} offset={0.4} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
});
