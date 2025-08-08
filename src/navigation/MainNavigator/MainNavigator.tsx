import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();
import GameScreenContainer from "../../components/GameScreenContainer";
import InventoryScreen from "../../screens/InventoryScreen";
import DeathScreen from "../../screens/DeathScreen";
import { StyleSheet, View } from "react-native";
import SkillsScreen from "../../screens/SkillsScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import { useAppDispatch } from "../../store/hooks";
import { loadGameState } from "../../store/slices/gameSlice";

const MainNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGameState());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Death" component={DeathScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Game" component={GameScreenContainer} />
          <Stack.Screen name="Skills" component={SkillsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
