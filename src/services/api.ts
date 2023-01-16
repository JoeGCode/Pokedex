import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const api = {
    requestFirst20: `${BASE_URL}/pokemon`,
    requestPokemon: `${BASE_URL}/pokemon/`,
    requestPokemonSpecies: `${BASE_URL}/pokemon-species/`,
    requestAllPokemon: `${BASE_URL}/pokemon?limit=100000&offset=0`,
}

export default api;