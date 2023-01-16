import React, { CSSProperties, FC } from 'react'
import { PokemonDetails, PokemonDetailsPokemon } from '../types'
import { typeColours, typeLogo } from '../utils/pokemonTypeHelpers'

const PokemonDetailsOverviewCard: FC<PokemonDetailsPokemon> = ({ pokemon }) => {

    const cardStyle: CSSProperties = {
        backgroundColor: typeColours[pokemon.types[0]],
        backgroundImage: pokemon.types.length > 1 ? `linear-gradient(to top left, ${typeColours[pokemon.types[1]]}, 35%, transparent)` : 'none'
    }

    const imageURL = (pokemon.frontPokemonHomeSprite ?? pokemon.frontDreamWorldSpriteURL) ?? pokemon.frontDefaultSpriteURL;

    return (
        <div style={cardStyle} className='flex flex-col shadow-lg items-center justify-center p-4 rounded-2xl relative bg-slate-200 mt-28'>
            <div className='absolute flex items-center justify-center -top-28 w-44 h-44'>
                <img className='max-w-full max-h-full animate-[slight-bounce_2s_ease_infinite]' src={imageURL} alt={pokemon.name} />
            </div>
            <div className='flex flex-col gap-2 w-full items-center justify-center pt-12'>
                <span className='text-lg'>{`#${pokemon.number}`}</span>
                <span className='text-2xl capitalize'>{pokemon.name}</span>
                <div className='flex justify-evenly w-full'>
                    {pokemon.types.map((type, index) => {
                        return <img className='w-20' src={typeLogo[type]} alt={type} key={index} />
                    })}
                </div>
                <div className='flex items-center w-full justify-evenly'>
                    <div className='flex flex-col items-center justify-center'>
                        <span>Height:</span>
                        <span>{pokemon.height / 10}m</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>Weight:</span>
                        <span>{pokemon.weight / 10}kg</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PokemonDetailsOverviewCard