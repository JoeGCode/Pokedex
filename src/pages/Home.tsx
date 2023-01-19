import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import NotFoundCard from '../components/NotFoundCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ThumbnailCard from '../components/ThumbnailCard';
import api from '../services/api';
import { AllPokemonResults } from '../types'

const Home: FC = () => {
    const [loadedPokemon, setLoadedPokemon] = useState<string[]>([]);
    const [searchterm, setSearchTerm] = useState<string>("");
    const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
    const [startFrom, setStartFrom] = useState(0);
    const [searchedPokemon, setSearchedPokemon] = useState<string[]>([]);
    const [pokemonNotFound, setPokemonNotFound] = useState(false);

    const RESULTS_PER_PAGE = 20;

    useEffect(() => {
        if (!allPokemonNames?.length) {
            loadAllPokemon();
        }
    }, []);

    async function loadAllPokemon() {
        let res = await axios.get(api.requestAllPokemon);
        let results: AllPokemonResults[] = res.data.results;
        let allPokemon: string[] = results.map((pokemon, index) => pokemon.name);
        setAllPokemonNames(allPokemon);
    }

    useEffect(() => {
        let filtered = allPokemonNames.slice(startFrom, startFrom + RESULTS_PER_PAGE) ?? [];
        setLoadedPokemon(filtered);
    }, [allPokemonNames, startFrom]);

    useEffect(() => {
        searchPokemon(searchterm);
    }, [searchterm]);

    async function searchPokemon(value: string) {
        setSearchedPokemon([]);
        let parsedNumber = +value;
        if (value && (isNaN(parsedNumber) || parsedNumber === 0)) {
            let filteredPokemon = filterAllPokemon(value);
            if (filteredPokemon.length > 0) {
                setSearchedPokemon(filteredPokemon);
                setPokemonNotFound(false);
            } else {
                setPokemonNotFound(true);
            }

        } else if (value && !isNaN(parsedNumber) && parsedNumber > 0) {
            searchByNumber(parsedNumber);
        } else {
            // No value, so just reset
            setPokemonNotFound(false);
        }

    }

    async function searchByNumber(num: number) {
        try {
            let detailResults = await axios.get(api.requestPokemon + num);
            let searched: string[] = [];

            if (detailResults.status === 200) {
                let pokeDetails = detailResults.data;
                searched.push(pokeDetails.name);

                setSearchedPokemon(searched);
                setPokemonNotFound(false);
            } else {
                setPokemonNotFound(true);
            }
        } catch (error) {
            console.log(error);
            setPokemonNotFound(true);
        }
    }

    function filterAllPokemon(searchFilter: string) {
        return allPokemonNames.filter((name) => name.toLowerCase().includes(searchFilter.toLowerCase())).slice(0, RESULTS_PER_PAGE);
    }

    return (
        <div className='flex flex-col items-center justify-center'>
        <div className='pb-20 w-full max-w-screen-2xl'>
            <SearchBar setSearch={setSearchTerm} />
            {pokemonNotFound && (
                <div className='max-w-screen-md w-full mx-auto'><NotFoundCard /></div>
            )}
            <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                
                {!pokemonNotFound && (!searchedPokemon || searchedPokemon.length === 0) && loadedPokemon?.map((name, index) => {
                    return <ThumbnailCard pokemonName={name} key={index} />
                })}
                {!pokemonNotFound && searchedPokemon && searchedPokemon?.map((name, index) => {
                    return <ThumbnailCard pokemonName={name} key={index} />
                })}
            </div>
            {!pokemonNotFound && (!searchedPokemon || searchedPokemon.length === 0) && <Pagination startFrom={startFrom} resultsLength={allPokemonNames.length} resultsPerPage={RESULTS_PER_PAGE} setStart={setStartFrom} />}
        </div>
        </div>
    )
}

export default Home