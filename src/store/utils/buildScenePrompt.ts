import { Scene, PlayerStats, InventoryState } from "../types/game";

export function buildScenePrompt(
  userInput: string,
  recentScenes: Scene[],
  stats: PlayerStats
): string {
  return `
Ты — движок визуальной новеллы RPG. Ниже история последних сцен и текущие характеристики игрока.

История:
${JSON.stringify(recentScenes, null, 2)}

Характеристики игрока:
- Здоровье: ${stats.health}
- Мана: ${stats.mana}
- Уровень: ${stats.level}

Игрок написал, что хочет сделать дальше: "${userInput}".

Сгенерируй следующую сцену строго в JSON формате.  
Обязательные поля и формат:

{
  "background": string,
  "text": string,
  "sceneId": string,
  "deltaStats": {
    "hp_reduce": number,
    "hp_increase": number,
    "mp_reduce": number,
    "mp_increase": number,
    "level_up": number
  },
  "itemsFound": [
    {
      "title": string,
      "description": string,
      "quantity": number,
      "deltaStats": {
        "hp_reduce": number,
        "hp_increase": number,
        "energy_reduce": number,
        "energy_increase": number,
        "satiety_reduce": number,
        "satiety_increase": number,
        "mp_reduce": number,
        "mp_increase": number,
        "level_up": number,
        "enemy_hp_reduce": number
      },
      "fatal": boolean
    }
  ]
}

Обрати внимание:  
- Будь жестоким по отношению  игроку, но не абсурдным и ни при каких обстоятельствах не снимай ХП и Ману просто так.
- Ни при каких обстоятельствах не добавляй в deltaStats дополнительные поля кроме перечисленных.  
- Если изменений нет — ставь все значения deltaStats в 0.  
- Если нет предметов — возвращай пустой массив itemsFound: [].  
- Не добавляй ничего лишнего: только JSON объекта, без комментариев, без текста вне JSON.  
- Вот пример корректного ответа с пустым массивом:

{
  "background": "https://example.com/photo.jpg",
  "text": "Вы стоите в пустой комнате.",
  "deltaStats": {
    "hp_reduce": 0,
    "hp_increase": 0,
    "mp_reduce": 0,
    "mp_increase": 0,
    "level_up": 0
  },
  "itemsFound": []
}
`;
}
