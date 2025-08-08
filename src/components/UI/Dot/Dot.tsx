import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

type DotProps = {
  delay: number;
};

const Dot = ({ delay }: DotProps) => {
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [delay, scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{ scale }],
        },
      ]}
    />
  );
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
