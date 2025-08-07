import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useItem } from "../../store/slices/gameSlice";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { DeathScreenNavigationProp } from "../../navigation/types";
import Item from "../../components/Items";

const InventoryScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P/PressStart2P-Regular.ttf"),
  });

  const navigation = useNavigation<DeathScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.game.inventory.items);

  const handleUseItem = (title: string) => {
    dispatch(useItem(title));
  };

  const renderItem = ({ item }: { item: (typeof items)[0] }) => (
    <Item
      title={item.title}
      description={item.description}
      quantity={item.quantity}
      onUse={() => handleUseItem(item.title)}
    />
  );

  const goBack = () => {
    navigation.navigate("Game");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontFamily: "PressStart2P" }]}>
        Инвентарь
      </Text>
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

      <View style={styles.itemsContainer}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { fontFamily: "PressStart2P" }]}>
              Инвентарь пуст
            </Text>
          </View>
        ) : (
          <FlatList
            data={items.filter((item) => item.quantity > 0)}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  header: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 20,
    textAlign: "center",
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
  itemsContainer: {
    marginTop: 20,
  },
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
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default InventoryScreen;
