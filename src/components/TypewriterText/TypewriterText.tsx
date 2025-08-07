import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import useTypewriter from "../../hooks/useTypewriter";

interface TypewriterTextProps {
  fullText: string;
  speed?: number;
  sceneId: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  fullText,
  speed = 50,
  sceneId,
}) => {
  const { displayedText } = useTypewriter({ fullText, speed, sceneId });

  return (
    <Text
      style={{
        fontFamily: "PressStart2P",
        color: "#FFF",
        textAlign: "center",
        lineHeight: 20,
      }}
    >
      {displayedText}
    </Text>
  );
};

export default TypewriterText;
