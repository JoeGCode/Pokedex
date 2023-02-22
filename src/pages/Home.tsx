import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NotFoundCard from "../components/NotFoundCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import ThumbnailCard from "../components/ThumbnailCard";
import api from "../services/api";
import { AllPokemonResults } from "../types";

const Home: FC = () => {
  const [loadedPokemon, setLoadedPokemon] = useState<string[]>([]);
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
  const [pokemonNotFound, setPokemonNotFound] = useState(false);
  const [showPaginationButtons, setShowPaginationButtons] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({});

  const startFrom = (): number => {
    let startFromQuery = searchParams.get("startFrom") ?? "0";
    if (isStringANumber(startFromQuery, true)) return +startFromQuery;
    else return 0;
  };

  const RESULTS_PER_PAGE = 20;

  useEffect(() => {
    homePageInit();
  }, []);

  function homePageInit() {
    if (allPokemonNames?.length === 0) {
      getAllPokemonNames();
    }
  }

  function checkAndLoadFromUrlParams() {
    const query = searchParams.get("query");
    const startFromParam = searchParams.get("startFrom");
    homePageInit();
    if (query) {
      searchPokemon(query);
      setShowPaginationButtons(false);
    } else if (startFromParam) {
      filterPokemonByPageAndLoad(startFrom());
      setShowPaginationButtons(true);
    } else {
      filterPokemonByPageAndLoad(0);
      setShowPaginationButtons(true);
    }
  }

  // Just get all the names of the pokemon available from the api
  // Can use this to check if a search is valid before calling the api again
  async function getAllPokemonNames() {
    let res = await axios.get(api.requestAllPokemon);
    let results: AllPokemonResults[] = res.data.results;
    let allPokemon: string[] = results.map((pokemon, index) => pokemon.name);
    setAllPokemonNames(allPokemon);
  }

  useEffect(() => {
    checkAndLoadFromUrlParams();
  }, [allPokemonNames, searchParams]);

  function filterPokemonByPageAndLoad(start: number) {
    let filtered = allPokemonNames.slice(start, start + RESULTS_PER_PAGE) ?? [];
    setLoadedPokemon(filtered);
  }

  function nextPage() {
    setSearchParams({
      startFrom: (startFrom() + RESULTS_PER_PAGE).toString(),
    });
  }

  function previousPage() {
    setSearchParams({
      startFrom: (startFrom() - RESULTS_PER_PAGE).toString(),
    });
  }

  function searchHandler(value: string) {
    setSearchParams({ query: value });
  }

  async function searchPokemon(value: string) {
    // let parsedNumber = +value; // Shorthand for parsing a number from a string
    // if (value && (isNaN(parsedNumber) || parsedNumber === 0)) {
    //   let filteredPokemon = filterPokemonBySearch(value);
    //   if (filteredPokemon.length > 0) {
    //     setLoadedPokemon(filteredPokemon);
    //     setPokemonNotFound(false);
    //   } else {
    //     setPokemonNotFound(true);
    //   }
    // } else if (value && !isNaN(parsedNumber) && parsedNumber > 0) {
    //   searchByNumber(parsedNumber);
    // } else {
    //   // No value, so just reset
    //   setPokemonNotFound(false);
    // }

    if (isStringANumber(value, false)) {
      searchByNumber(+value);
    } else {
      if (value != null) {
        let filteredPokemon = filterPokemonBySearch(value);
        if (filteredPokemon.length > 0) {
          setLoadedPokemon(filteredPokemon);
          setPokemonNotFound(false);
        } else {
          setPokemonNotFound(true);
        }
      } else {
        // No value, so just reset
        setPokemonNotFound(false);
      }
    }
  }

  async function searchByNumber(num: number) {
    try {
      let detailResults = await axios.get(api.requestPokemon + num);
      let searched: string[] = [];

      if (detailResults.status === 200) {
        let pokeDetails = detailResults.data;
        searched.push(pokeDetails.name);

        setLoadedPokemon(searched);
        setPokemonNotFound(false);
      } else {
        setPokemonNotFound(true);
      }
    } catch (error) {
      console.log(error);
      setPokemonNotFound(true);
    }
  }

  function filterPokemonBySearch(searchFilter: string) {
    return allPokemonNames
      .filter((name) => name.toLowerCase().includes(searchFilter.toLowerCase()))
      .slice(0, RESULTS_PER_PAGE);
  }

  function isStringANumber(value: string, includeZero: boolean): boolean {
    if (includeZero) {
      return value != null && !isNaN(+value) && +value >= 0;
    } else {
      return value != null && !isNaN(+value) && +value > 0;
    }
  }

  function showPaginationButton(nextButton: boolean): boolean {
    const resultsLength = allPokemonNames.length;
    if (nextButton) {
      return startFrom() + RESULTS_PER_PAGE <= resultsLength ? true : false;
    } else {
      return startFrom() - RESULTS_PER_PAGE >= 0 ? true : false;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pb-20 w-full max-w-screen-2xl">
        <SearchBar searchHandler={searchHandler} />
        {pokemonNotFound && (
          <div className="max-w-screen-md w-full mx-auto">
            <NotFoundCard />
          </div>
        )}
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {!pokemonNotFound &&
            loadedPokemon?.length &&
            loadedPokemon?.map((name, index) => {
              return <ThumbnailCard pokemonName={name} key={index} />;
            })}
        </div>
        {!pokemonNotFound && showPaginationButtons && (
          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            showNextButton={showPaginationButton(true)}
            showPreviousButton={showPaginationButton(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
