export type PokemonDetails = {
    name: string,
    id: number,
    number: string,
    frontDefaultSpriteURL: string,
    frontDreamWorldSpriteURL: string,
    frontPokemonHomeSprite: string,
    types: string[],
    height: number, // height is received in decimetres
    weight: number, // weight is received in hectograms, 1 hectogram = 100 grams
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
}

export type PokemonThumbnail = {
    name: string,
    id: number,
    number: string,
    frontDefaultSpriteURL: string,
    types: string[],
}

export type AllPokemonResults = {
    name: string,
    url: string,
}

export type PokeStat = {
    base_stat: number,
    effort: number,
    stat: PokeStatDetail,
}

export type PokeStatDetail = {
    name: string,
    url: string,
}

export type PokemonDetailsPokemon = {
    pokemon: PokemonDetails,
}