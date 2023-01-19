import axios from 'axios'
import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { PokemonDetails, PokemonThumbnail } from '../types'
import { typeColours, typeLogo } from '../utils/pokemonTypeHelpers'
import SkeletonThumbnailCard from './SkeletonThumbnailCard'

type ThumbnailProps = {
    pokemonName: string,
}

const ThumbnailCard: FC<ThumbnailProps> = ({ pokemonName }) => {

    const [pokemon, setPokemon] = useState<PokemonThumbnail>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        axios.get(api.requestPokemon + pokemonName)
            .then(detailResults => {
                let pokeDetails = detailResults.data;
                let pokeObj: PokemonThumbnail = {
                    name: pokeDetails.name,
                    id: pokeDetails.id,
                    number: pokeDetails.id.toString().padStart(3, '0'),
                    frontDefaultSpriteURL: pokeDetails.sprites.front_default,
                    frontDreamWorldSpriteURL: pokeDetails.sprites.other.dream_world.front_default,
                    frontPokemonHomeSprite: pokeDetails.sprites.other.home.front_default,
                    frontOfficialArtworkSprite: pokeDetails.sprites.other['official-artwork'].front_default,
                    types: pokeDetails.types.map((type: any) => {
                        return type.type.name
                    }),
                };

                setPokemon(pokeObj);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });

    }, [pokemonName]);

    let style: CSSProperties = {
        backgroundColor: pokemon ? typeColours[pokemon.types[0]] : "transparent",
        backgroundImage: (pokemon && pokemon.types.length > 1) ? `linear-gradient(to top left, ${typeColours[pokemon.types[1]]}, 35%, transparent)` : 'none'
    }

    let imageURL = pokemon ? ((pokemon.frontDefaultSpriteURL ?? pokemon.frontDreamWorldSpriteURL) ?? pokemon.frontPokemonHomeSprite) ?? pokemon.frontOfficialArtworkSprite : undefined;

    return (
        <>
            {isLoading && <SkeletonThumbnailCard />}
            {(!isLoading && pokemon) &&
                <Link to={`/details/${pokemon.name}`} >
                    <div style={style} className='flex flex-col shadow-lg items-center justify-center p-4 rounded-2xl cursor-pointer transition-transform hover:scale-105'>
                        <h1 className='capitalize text-2xl font-bold'>{pokemon.name}</h1>
                        <h3 className='text-lg'>{`#${pokemon.number}`}</h3>
                        <div className='w-[186px]'>
                            <img className='w-full block animate-[slight-bounce_1s_ease_infinite]' src={imageURL} alt={pokemon.name} />
                        </div>
                        <div className='flex justify-evenly w-full'>
                            {pokemon.types.map((type, index) => {
                                return <img className='w-[100px]' src={typeLogo[type]} alt={type} key={index} />
                            })}
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default ThumbnailCard