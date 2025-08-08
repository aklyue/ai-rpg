import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Death: undefined;
  Inventory: undefined;
  Skills: undefined;
  Stats: undefined;
  Settings: { screen?: Exclude<keyof RootStackParamList, "Settings"> };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type GameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Game"
>;

export type DeathScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Death"
>;

export type InventoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Inventory"
>;

export type SkillsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Skills"
>;

export type StatsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Stats"
>;

export type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>;
