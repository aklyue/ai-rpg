import React from "react";
import { View, StyleSheet } from "react-native";
import Dot from "../Dot";

export const ThreeDotsLoading = () => {
  return (
    <View style={styles.container}>
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
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
  dot: {
    width: 12,
    height: 12,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 0,
  },
});
