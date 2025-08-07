import { InventoryState } from "../types/game";
import { generateItemId } from "../utils/game";

export const initialInventory: InventoryState = {
  items: [
    {
      title: "Маленькая лечебная бутылочка",
      id: generateItemId("Маленькая лечебная бутылочка"),
      description: "Восстанавливает немного здоровья при использовании.",
      quantity: 3,
      deltaStats: {
        hp_increase: 20,
      },
    },
    {
      title: "Зелье маны",
      id: generateItemId("Зелье маны"),
      description: "Восстанавливает часть маны.",
      quantity: 5,
      deltaStats: {
        mp_increase: 30,
      },
    },
    {
      title: "Булка хлеба",
      id: generateItemId("Булка хлеба"),
      description:
        "Просто булка хлеба. Он немного зачерствел.",
      quantity: 3,
      deltaStats: {
        satiety_increase: 15,
      },
      fatal: false,
    },
    {
      title: "Священный артефакт",
      id: generateItemId("Священный артефакт"),
      description: "Особенный предмет, который повышает уровень владельца.",
      quantity: 1,
      deltaStats: {
        level_up: 1,
      },
    },
    {
      title: "Амулет смерти",
      id: generateItemId("Амулет смерти"),
      description:
        "Опасный амулет, который может привести к смерти при использовании.",
      quantity: 1,
      fatal: true,
    },
  ],
};
