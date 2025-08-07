export interface Option {
  label: string;
  actionId: string;
}

export interface Scene {
  background: string;
  text: string;
  sceneId: string;
  deltaStats?: DeltaStats;
  itemsFound?: Item[];
  fatal?: boolean;
}

export interface DeltaStats {
  hp_reduce?: number;
  hp_increase?: number;
  energy_reduce?: number;
  energy_increase?: number;
  satiety_reduce?: number;
  satiety_increase?: number;
  mp_reduce?: number;
  mp_increase?: number;
  level_up?: number;
  enemy_hp_reduce?: number;
}

export interface PlayerStats {
  health: number;
  mana: number;
  satiety: number;
  energy: number;
  level: number;
}

export interface Skill {
  name: string;
  description: string;
  manaCost: number;
}

export interface Skills {
  [key: string]: Skill;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  quantity: number;
  deltaStats?: DeltaStats;
  fatal?: boolean;
}

export interface InventoryState {
  items: Item[];
}

export interface GameState {
  history: Scene[];
  currentScene: Scene;
  stats: PlayerStats;
  skills: Skills;
  day: number;
  loading: boolean;
  error?: string;
  inventory: InventoryState;
}
