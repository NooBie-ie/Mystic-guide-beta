
export enum EnchantCategory {
  TOOLS = 'Tools',
  ARMOR = 'Armor',
  EXTRAS = 'Extras',
  TABLE = 'Enchanting Table',
  COMBOS = 'Combos'
}

export interface Enchantment {
  id: string;
  name: string;
  maxLevel: number;
  description: string;
  items: string[]; // e.g., ['Pickaxe', 'Shovel']
  incompatibleWith?: string[];
  isTreasure?: boolean;
  isCurse?: boolean;
}

export interface TableEnchantment {
    id: string;
    name: string;
    maxTableLevel: number; // Max level usually obtainable from table
    weight: number; // Minecraft Rarity Weight (10=Common, 1=Very Rare)
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare';
    items: string[];
}

export interface EnchantCombo {
    id: string;
    name: string;
    item: string;
    enchants: string[];
    description: string;
}

export interface AIAdviceResponse {
  strategy: string;
  tips: string[];
  conflicts: string;
}

export interface FilterOptions {
  itemType: string; // 'All', 'Sword', 'Pickaxe', etc.
  treasureOnly: boolean;
  noCurses: boolean;
}

export type DataType = 'ENCHANT' | 'COMBO' | 'TABLE';

export interface UnifiedSearchResult {
  dataType: DataType;
  data: Enchantment | TableEnchantment | EnchantCombo;
}
