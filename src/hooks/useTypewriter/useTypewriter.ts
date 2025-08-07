import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
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
  }, [fullText, speed, sceneId]);

  return {
    displayedText,
  };
};
