import { DeltaStats, InventoryState, Item, PlayerStats } from "../types/game";

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function generateItemId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/(^-|-$)+/g, "");
}

export function applyDeltaStats(
  stats: PlayerStats,
  delta: DeltaStats
): PlayerStats {
  return {
    health: clamp(
      stats.health + (delta.hp_increase ?? 0) - (delta.hp_reduce ?? 0),
      0,
      100
    ),
    energy: clamp(
      stats.energy + (delta.energy_increase ?? 0) - (delta.energy_reduce ?? 0),
      0,
      100
    ),
    satiety: clamp(
      stats.satiety + (delta.satiety_increase ?? 0) - (delta.satiety_reduce ?? 0),
      0,
      100
    ),
    mana: clamp(
      stats.mana + (delta.mp_increase ?? 0) - (delta.mp_reduce ?? 0),
      0,
      100
    ),
    level: stats.level + (delta.level_up ?? 0),
  };
}

export function addItemsToInventory(
  inventory: InventoryState,
  items: Item[]
): {
  updatedInventory: InventoryState;
  logText: string;
} {
  let logText = "";

  const updatedItems = [...inventory.items];

  for (const newItem of items) {
    const id = generateItemId(newItem.title);
    const existingItem = updatedItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      updatedItems.push({ ...newItem, id });
    }

    logText += `\n\nВы нашли предмет: ${newItem.title} (${newItem.description}) x${newItem.quantity}`;
  }

  return {
    updatedInventory: { items: updatedItems },
    logText,
  };
}
