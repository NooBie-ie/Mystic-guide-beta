
import { Enchantment, EnchantCategory, EnchantCombo, TableEnchantment } from './types';

export const TOOLS_ENCHANTS: Enchantment[] = [
  {
    id: 'eff',
    name: 'Efficiency',
    maxLevel: 5,
    description: 'Increases mining speed.',
    items: ['Pickaxe', 'Shovel', 'Axe', 'Hoe', 'Shears'],
  },
  {
    id: 'silk',
    name: 'Silk Touch',
    maxLevel: 1,
    description: 'Mined blocks drop themselves instead of items.',
    items: ['Pickaxe', 'Shovel', 'Axe', 'Hoe'],
    incompatibleWith: ['Fortune'],
  },
  {
    id: 'fort',
    name: 'Fortune',
    maxLevel: 3,
    description: 'Increases block drops.',
    items: ['Pickaxe', 'Shovel', 'Axe', 'Hoe'],
    incompatibleWith: ['Silk Touch'],
  },
  {
    id: 'unb',
    name: 'Unbreaking',
    maxLevel: 3,
    description: 'Increases item durability.',
    items: ['All Tools'],
  },
  {
    id: 'mend',
    name: 'Mending',
    maxLevel: 1,
    description: 'Repairs the item using XP orbs.',
    items: ['All Tools'],
    isTreasure: true,
  },
  {
    id: 'sharp',
    name: 'Sharpness',
    maxLevel: 5,
    description: 'Increases melee damage.',
    items: ['Sword', 'Axe'],
    incompatibleWith: ['Smite', 'Bane of Arthropods'],
  }
];

export const ARMOR_ENCHANTS: Enchantment[] = [
  {
    id: 'prot',
    name: 'Protection',
    maxLevel: 4,
    description: 'Reduces general damage.',
    items: ['Helmet', 'Chestplate', 'Leggings', 'Boots'],
    incompatibleWith: ['Blast Protection', 'Fire Protection', 'Projectile Protection'],
  },
  {
    id: 'feather',
    name: 'Feather Falling',
    maxLevel: 4,
    description: 'Reduces fall damage.',
    items: ['Boots'],
  },
  {
    id: 'resp',
    name: 'Respiration',
    maxLevel: 3,
    description: 'Extends underwater breathing time.',
    items: ['Helmet'],
  },
  {
    id: 'aqua',
    name: 'Aqua Affinity',
    maxLevel: 1,
    description: 'Increases underwater mining speed.',
    items: ['Helmet'],
  },
  {
    id: 'thorns',
    name: 'Thorns',
    maxLevel: 3,
    description: 'Reflects damage to attackers.',
    items: ['Helmet', 'Chestplate', 'Leggings', 'Boots'],
  },
  {
    id: 'depth',
    name: 'Depth Strider',
    maxLevel: 3,
    description: 'Increases underwater movement speed.',
    items: ['Boots'],
    incompatibleWith: ['Frost Walker'],
  }
];

export const EXTRA_ENCHANTS: Enchantment[] = [
  {
    id: 'loot',
    name: 'Looting',
    maxLevel: 3,
    description: 'Increases mob drops.',
    items: ['Sword'],
  },
  {
    id: 'inf',
    name: 'Infinity',
    maxLevel: 1,
    description: 'Shooting bows does not consume arrows.',
    items: ['Bow'],
    incompatibleWith: ['Mending'],
  },
  {
    id: 'flame',
    name: 'Flame',
    maxLevel: 1,
    description: 'Arrows set targets on fire.',
    items: ['Bow'],
  },
  {
    id: 'loyalty',
    name: 'Loyalty',
    maxLevel: 3,
    description: 'Trident returns after being thrown.',
    items: ['Trident'],
    incompatibleWith: ['Riptide'],
  },
  {
    id: 'chan',
    name: 'Channeling',
    maxLevel: 1,
    description: 'Summons lightning during thunderstorms.',
    items: ['Trident'],
    incompatibleWith: ['Riptide'],
  },
  {
    id: 'rip',
    name: 'Riptide',
    maxLevel: 3,
    description: 'Propels player when thrown in water/rain.',
    items: ['Trident'],
    incompatibleWith: ['Loyalty', 'Channeling'],
  },
  {
    id: 'binding_curse',
    name: 'Curse of Binding',
    maxLevel: 1,
    description: 'Items cannot be removed from armor slots once equipped.',
    items: ['Armor', 'Elytra', 'Pumpkin'],
    isCurse: true,
  },
  {
    id: 'vanishing_curse',
    name: 'Curse of Vanishing',
    maxLevel: 1,
    description: 'Item disappears completely upon death.',
    items: ['All Items'],
    isCurse: true,
  }
];

export const TABLE_ENCHANTS_DATA: TableEnchantment[] = [
    { id: 'eff', name: 'Efficiency', maxTableLevel: 4, weight: 10, rarity: 'Common', items: ['Tools'] }, // Level 5 is Gold/Anvil only
    { id: 'prot', name: 'Protection', maxTableLevel: 4, weight: 10, rarity: 'Common', items: ['Armor'] },
    { id: 'sharp', name: 'Sharpness', maxTableLevel: 4, weight: 10, rarity: 'Common', items: ['Sword', 'Axe'] }, // Level 5 is Gold/Anvil only
    { id: 'power', name: 'Power', maxTableLevel: 5, weight: 10, rarity: 'Common', items: ['Bow'] },
    { id: 'piercing', name: 'Piercing', maxTableLevel: 4, weight: 10, rarity: 'Common', items: ['Crossbow'] },
    
    { id: 'unb', name: 'Unbreaking', maxTableLevel: 3, weight: 5, rarity: 'Uncommon', items: ['All'] },
    { id: 'fireprot', name: 'Fire Protection', maxTableLevel: 4, weight: 5, rarity: 'Uncommon', items: ['Armor'] },
    { id: 'projprot', name: 'Projectile Protection', maxTableLevel: 4, weight: 5, rarity: 'Uncommon', items: ['Armor'] },
    { id: 'feather', name: 'Feather Falling', maxTableLevel: 4, weight: 5, rarity: 'Uncommon', items: ['Boots'] },
    { id: 'kb', name: 'Knockback', maxTableLevel: 2, weight: 5, rarity: 'Uncommon', items: ['Sword'] },
    { id: 'smite', name: 'Smite', maxTableLevel: 5, weight: 5, rarity: 'Uncommon', items: ['Sword'] },
    { id: 'bane', name: 'Bane of Arthropods', maxTableLevel: 5, weight: 5, rarity: 'Uncommon', items: ['Sword'] },
    { id: 'loyalty', name: 'Loyalty', maxTableLevel: 3, weight: 5, rarity: 'Uncommon', items: ['Trident'] },
    { id: 'quick', name: 'Quick Charge', maxTableLevel: 3, weight: 5, rarity: 'Uncommon', items: ['Crossbow'] },
    
    { id: 'fort', name: 'Fortune', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Tools'] },
    { id: 'loot', name: 'Looting', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Sword'] },
    { id: 'resp', name: 'Respiration', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Helmet'] },
    { id: 'aqua', name: 'Aqua Affinity', maxTableLevel: 1, weight: 2, rarity: 'Rare', items: ['Helmet'] },
    { id: 'depth', name: 'Depth Strider', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Boots'] },
    { id: 'blast', name: 'Blast Protection', maxTableLevel: 4, weight: 2, rarity: 'Rare', items: ['Armor'] },
    { id: 'fire', name: 'Fire Aspect', maxTableLevel: 2, weight: 2, rarity: 'Rare', items: ['Sword'] },
    { id: 'sweep', name: 'Sweeping Edge', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Sword'] },
    { id: 'punch', name: 'Punch', maxTableLevel: 2, weight: 2, rarity: 'Rare', items: ['Bow'] },
    { id: 'flame', name: 'Flame', maxTableLevel: 1, weight: 2, rarity: 'Rare', items: ['Bow'] },
    { id: 'luck', name: 'Luck of the Sea', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Rod'] },
    { id: 'lure', name: 'Lure', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Rod'] },
    { id: 'impaling', name: 'Impaling', maxTableLevel: 5, weight: 2, rarity: 'Rare', items: ['Trident'] },
    { id: 'rip', name: 'Riptide', maxTableLevel: 3, weight: 2, rarity: 'Rare', items: ['Trident'] },
    { id: 'multi', name: 'Multishot', maxTableLevel: 1, weight: 2, rarity: 'Rare', items: ['Crossbow'] },
    { id: 'thorns', name: 'Thorns', maxTableLevel: 3, weight: 1, rarity: 'Rare', items: ['Armor'] },
    
    { id: 'silk', name: 'Silk Touch', maxTableLevel: 1, weight: 1, rarity: 'Very Rare', items: ['Tools'] },
    { id: 'inf', name: 'Infinity', maxTableLevel: 1, weight: 1, rarity: 'Very Rare', items: ['Bow'] },
    { id: 'chan', name: 'Channeling', maxTableLevel: 1, weight: 1, rarity: 'Very Rare', items: ['Trident'] },
]

export const BEST_COMBOS: EnchantCombo[] = [
    {
        id: 'god_sword',
        name: 'The God Slayer',
        item: 'Netherite Sword',
        enchants: ['Sharpness V', 'Looting III', 'Unbreaking III', 'Sweeping Edge III', 'Mending', 'Fire Aspect II'],
        description: 'The ultimate melee weapon. Maximizes damage, drops, and durability. Perfect for general survival and mob farming.'
    },
    {
        id: 'god_pick_fortune',
        name: 'Fortune Miner',
        item: 'Pickaxe',
        enchants: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending'],
        description: 'Multiply your diamonds and ore drops. Do not use on Stone or Glass.'
    },
    {
        id: 'god_pick_silk',
        name: 'Silk Touch Master',
        item: 'Pickaxe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        description: 'Collect blocks exactly as they are (Glass, Ice, Ores). Essential for building.'
    },
    {
        id: 'god_shovel',
        name: 'The Terraformer',
        item: 'Shovel',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        description: 'Instantly mine dirt, grass, sand, and gravel. Silk Touch keeps Grass Blocks and Mycelium intact.'
    },
    {
        id: 'god_axe',
        name: 'Viking Axe',
        item: 'Axe',
        enchants: ['Sharpness V', 'Efficiency V', 'Unbreaking III', 'Mending', 'Silk Touch'],
        description: 'A dual-purpose tool. Devastating in combat (disables shields) and instantly chops wood. Silk Touch saves inventory space (leaves).'
    },
    {
        id: 'god_hoe',
        name: "Nature's Touch",
        item: 'Hoe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        description: 'The fastest way to gather Sculk blocks, Leaves, and Shroomlights. Essential for Deep Dark exploration.'
    },
    {
        id: 'god_hoe_fortune',
        name: 'Crop Master',
        item: 'Hoe',
        enchants: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending'],
        description: 'Maximize crop yields (Carrots, Potatoes) and sapling drops. Also works on leaves for more apples.'
    },
    {
        id: 'god_bow',
        name: 'Sniper Bow',
        item: 'Bow',
        enchants: ['Power V', 'Punch II', 'Flame', 'Unbreaking III', 'Infinity'],
        description: 'Infinite arrows with massive damage and knockback. (Mending is mutually exclusive with Infinity).'
    },
    {
        id: 'machine_gun_crossbow',
        name: 'Crowd Control',
        item: 'Crossbow',
        enchants: ['Multishot', 'Quick Charge III', 'Unbreaking III', 'Mending'],
        description: 'Fires 3 arrows for the price of 1. Combined with Fireworks, this is a weapon of mass destruction.'
    },
    {
        id: 'sniper_crossbow',
        name: 'Armor Piercer',
        item: 'Crossbow',
        enchants: ['Piercing IV', 'Quick Charge III', 'Unbreaking III', 'Mending'],
        description: 'Arrows shoot through enemies and shields. You can pick the arrows back up after firing.'
    },
    {
        id: 'trident_poseidon',
        name: "Poseidon's Wrath",
        item: 'Trident',
        enchants: ['Impaling V', 'Loyalty III', 'Channeling', 'Unbreaking III', 'Mending'],
        description: 'The ultimate ranged weapon for wet conditions. Summons lightning and returns to your hand automatically.'
    },
    {
        id: 'trident_rocket',
        name: 'Human Rocket',
        item: 'Trident',
        enchants: ['Riptide III', 'Impaling V', 'Unbreaking III', 'Mending'],
        description: 'Launch yourself through the sky when it rains. Combine with Elytra for infinite flight speed.'
    },
    {
        id: 'god_elytra',
        name: 'Sky Ruler',
        item: 'Elytra',
        enchants: ['Unbreaking III', 'Mending'],
        description: 'Essential for flight. Mending is mandatory as Elytra breaks quickly and Phantom Membranes are annoying to farm.'
    },
    {
        id: 'god_helmet',
        name: 'Deep Diver',
        item: 'Helmet',
        enchants: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending'],
        description: 'Breathe and mine underwater almost as effectively as on land.'
    },
    {
        id: 'god_chest',
        name: 'Tank Chestplate',
        item: 'Chestplate',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending', 'Thorns III'],
        description: 'Maximum defense. Note: Thorns degrades durability faster, but deals damage back.'
    },
    {
        id: 'blast_chest',
        name: 'Bomb Squad Vest',
        item: 'Chestplate',
        enchants: ['Blast Protection IV', 'Unbreaking III', 'Mending', 'Thorns III'],
        description: 'Specialized defense against Creepers, TNT, and Wither skulls. Swap this in for explosive fights.'
    },
    {
        id: 'god_legs',
        name: 'Swift Shadow',
        item: 'Leggings',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending', 'Swift Sneak III'],
        description: 'Walk at full speed while sneaking. Essential for Ancient Cities and building bridges safely.'
    },
    {
        id: 'fire_legs',
        name: 'Nether Walker',
        item: 'Leggings',
        enchants: ['Fire Protection IV', 'Unbreaking III', 'Mending', 'Swift Sneak III'],
        description: 'Drastically reduces burn damage. Essential for Nether fortress raiding and lava handling.'
    },
    {
        id: 'god_boots',
        name: 'Explorer Boots',
        item: 'Boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Depth Strider III', 'Unbreaking III', 'Mending', 'Soul Speed III'],
        description: 'Survive massive falls, swim fast, and run on soul sand.'
    },
    {
        id: 'god_rod',
        name: 'Ultimate Fisher',
        item: 'Fishing Rod',
        enchants: ['Luck of the Sea III', 'Lure III', 'Unbreaking III', 'Mending'],
        description: 'Catch treasure (enchanted books, saddles) faster and reduce junk catches.'
    }
]

export const CATEGORIES = [
    { id: EnchantCategory.TOOLS, label: 'Tools & Weapons', icon: 'Pickaxe' },
    { id: EnchantCategory.ARMOR, label: 'Armor & Wearables', icon: 'Shield' },
    { id: EnchantCategory.EXTRAS, label: 'Utility & Magic', icon: 'Sparkles' },
    { id: EnchantCategory.TABLE, label: 'Enchanting Table', icon: 'BookOpen' },
    { id: EnchantCategory.COMBOS, label: 'Best Combos', icon: 'Layers' },
];
