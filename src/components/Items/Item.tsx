import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  title: string;
  description: string;
  quantity: number;
  onUse: () => void;
};

const Item: React.FC<Props> = ({ title, description, quantity, onUse }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { fontFamily: "PressStart2P" }]}>
          {title} (x{quantity})
        </Text>
        <Text
          style={[
            styles.description,
            { fontFamily: "PressStart2P", fontSize: 8 },
          ]}
        >
          {description}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, quantity === 0 && { opacity: 0.5 }]}
        onPress={onUse}
        disabled={quantity === 0}
      >
        <Text
          style={[
            styles.buttonText,
            { fontFamily: "PressStart2P", fontSize: 8 },
          ]}
        >
          Использовать
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: "#aaa",
  },
  button: {
    borderWidth: 2,
    borderColor: "#a0a0a0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    marginLeft: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
