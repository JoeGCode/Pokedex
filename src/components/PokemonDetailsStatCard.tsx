import React, { FC } from 'react'
import { PokemonDetailsPokemon } from '../types'
import PokemonDetailsStatBarHorizontal from './PokemonDetailStatBarHorizontal'

const PokemonDetailsStatCard: FC<PokemonDetailsPokemon> = ({ pokemon }) => {
    return (
        <div className='flex flex-col shadow-lg items-center justify-center p-4 rounded-2xl bg-slate-400'>
            <h2 className='text-2xl'>Stats</h2>
            <div className='flex flex-col w-full items-center justify-center gap-2 mt-4'>
                <PokemonDetailsStatBarHorizontal statName='HP' statValue={pokemon.hp} primaryType={pokemon.types[0]} />
                <PokemonDetailsStatBarHorizontal statName='Attack' statValue={pokemon.attack} primaryType={pokemon.types[0]} />
                <PokemonDetailsStatBarHorizontal statName='Defense' statValue={pokemon.defense} primaryType={pokemon.types[0]} />
                <PokemonDetailsStatBarHorizontal statName='Special Attack' statValue={pokemon.specialAttack} primaryType={pokemon.types[0]} />
                <PokemonDetailsStatBarHorizontal statName='Special Defense' statValue={pokemon.specialDefense} primaryType={pokemon.types[0]} />
                <PokemonDetailsStatBarHorizontal statName='Speed' statValue={pokemon.speed} primaryType={pokemon.types[0]} />
            </div>
        </div>
    )
}

export default PokemonDetailsStatCard