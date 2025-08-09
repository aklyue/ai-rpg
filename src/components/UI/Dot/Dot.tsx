import React from "react";
import { Animated, StyleSheet } from "react-native";

type DotProps = {
  progress: Animated.Value;
  offset: number;
};

const Dot = ({ progress, offset }: DotProps) => {
  const scale = progress.interpolate({
    inputRange: [offset, offset + 0.25, offset + 0.5, 1 + offset],
    outputRange: [0.5, 1, 0.5, 0.5],
    extrapolate: "clamp",
  });

  return <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 12,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 0,
  },
});

export default Dot;
