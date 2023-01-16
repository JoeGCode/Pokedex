import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFoundCard from '../components/NotFoundCard';
import PokemonDetailsOverviewCard from '../components/PokemonDetailsOverviewCard';
import PokemonDetailsStatCard from '../components/PokemonDetailsStatCard';
import api from '../services/api';
import { PokemonDetails, PokeStat } from '../types';

const Detail = () => {
    const { name } = useParams();

    const [pokemon, setPokemon] = useState<PokemonDetails>();
    const [isFound, setIsFound] = useState(true);

    useEffect(() => {
        getPokeDetails();
    }, [name])


    async function getPokeDetails() {
        // setIsLoading(true);

        try {
            let detailResults = await axios.get(api.requestPokemon + name);

            if (detailResults.status === 200) {
                let pokeDetails = detailResults.data;

                let pokeObj: PokemonDetails = {
                    name: pokeDetails.name,
                    id: pokeDetails.id,
                    number: pokeDetails.id.toString().padStart(3, '0'),
                    frontDefaultSpriteURL: pokeDetails.sprites.front_default,
                    frontDreamWorldSpriteURL: pokeDetails.sprites.other.dream_world.front_default,
                    frontPokemonHomeSprite: pokeDetails.sprites.other.home.front_default,
                    height: pokeDetails.height,
                    weight: pokeDetails.weight,
                    types: pokeDetails.types.map((type: any) => {
                        return type.type.name
                    }),
                    hp: getStatValue(pokeDetails.stats, "hp"),
                    attack: getStatValue(pokeDetails.stats, "attack"),
                    defense: getStatValue(pokeDetails.stats, "defense"),
                    specialAttack: getStatValue(pokeDetails.stats, "special-attack"),
                    specialDefense: getStatValue(pokeDetails.stats, "special-defense"),
                    speed: getStatValue(pokeDetails.stats, "speed"),
                };

                setPokemon(pokeObj);
                setIsFound(true);
            } else {
                setIsFound(false);
            }
        } catch (error) {
            console.log(error);
            setIsFound(false);
        }
        // setIsLoading(false);
    }

    function getStatValue(stats: PokeStat[], statToGet: string): number {
        return stats.find((stat) => stat.stat.name === statToGet)?.base_stat ?? 0;
    }

    function renderDetailsPage(pokemon: PokemonDetails) {
        return (
            <div className='flex flex-col gap-6'>
                <PokemonDetailsOverviewCard pokemon={pokemon} />
                <PokemonDetailsStatCard pokemon={pokemon} />
            </div>

        );
    }

    return (
        <div className='flex flex-col'>
            {pokemon && isFound && renderDetailsPage(pokemon)}
            {!isFound && <NotFoundCard />}
        </div>
    )
}

export default Detail