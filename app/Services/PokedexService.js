import { ProxyState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";

export const pokedexApi = axios.create(
    {
        timeout: 10000
    });

class PokedexService
{
    async getAllPokemon()
    {
        const res = await pokedexApi.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
        ProxyState.pokedex = res.data.results;
        ProxyState.filteredPokedex = res.data.results;
    }

    async getPokemonByURL(pokemonURL)
    {
        const res = await pokedexApi.get(pokemonURL);
        const newPokemon = new Pokemon(res.data);
        return newPokemon;
    }

    searchPokedex(searchTerm)
    {
        ProxyState.filteredPokedex = ProxyState.pokedex.filter(pokemon => pokemon.name.includes(searchTerm));
    }
}

export const pokedexService = new PokedexService();