import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import TypewriterSoundManager from "../../preload/typewriterSoundManager";

const animationShownMap: Record<string, boolean> = {};

interface TypewriterTextProps {
  fullText: string;
  speed?: number;
  sceneId: string;
}

export const useTypewriter = ({
  fullText,
  speed,
  sceneId,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const playTick = () => {
    TypewriterSoundManager.playTick();
  };

  const skipAnimation = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setDisplayedText(fullText);
    animationShownMap[sceneId] = true;
  };

  useFocusEffect(
    useCallback(() => {
      if (animationShownMap[sceneId]) {
        setDisplayedText(fullText);
        return;
      }

      indexRef.current = 0;
      setDisplayedText("");

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      intervalIdRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          const nextChar = fullText.charAt(indexRef.current);
          indexRef.current += 1;

          if (nextChar !== " ") {
            playTick();
          }

          if (indexRef.current >= fullText.length) {
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current);
              intervalIdRef.current = null;
            }
            animationShownMap[sceneId] = true;
          }

          return prev + nextChar;
        });
      }, speed);

      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      };
    }, [fullText, speed, sceneId])
  );

  return {
    displayedText,
    skipAnimation,
  };
};
