export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other: any;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  species: PokemonSpecies;
  moves: PokemonMove[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}
