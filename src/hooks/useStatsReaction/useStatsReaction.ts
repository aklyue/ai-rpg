import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Animated } from "react-native";

export const useStatsReaction = () => {
  const { health } = useAppSelector((state) => state.game.stats);
  const prevHealthRef = useRef(health);
  const [showDamage, setShowDamage] = useState(false);
  const [showHeal, setShowHeal] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (health < prevHealthRef.current) {
      setShowDamage(true);
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowDamage(false);
      });
    } else if (health > prevHealthRef.current) {
      setShowHeal(true);
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowHeal(false);
      });
    }
    prevHealthRef.current = health;
  }, [health, opacityAnim]);

  return { showDamage, opacityAnim, showHeal };
};
