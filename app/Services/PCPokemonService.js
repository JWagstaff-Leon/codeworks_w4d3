import { ProxyState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";
import { activePokemonService } from "./ActivePokemonService.js";

export const bcwApi = axios.create(
    {
        baseURL: "https://bcw-sandbox.herokuapp.com/api",
        timeout: 10000
    });

class PCPokemonService 
{
    async getAllPokemon()
    {
        const res = await bcwApi.get('JoshuaWL/pokemon');
        ProxyState.pcPokemon = res.data.map(p => new Pokemon(p));
    }

    async catchPokemon()
    {
        const res = await bcwApi.post("JoshuaWL/pokemon", ProxyState.activePokemon);
        const newPokemon = new Pokemon(res.data);
        activePokemonService.setActivePokemon(newPokemon);
        ProxyState.pcPokemon = [...ProxyState.pcPokemon, newPokemon];
    }

    async releasePokemon()
    {
        const res = await bcwApi.delete("JoshuaWL/pokemon/" + ProxyState.activePokemon._id);
        ProxyState.pcPokemon = ProxyState.pcPokemon.filter(pokemon => pokemon._id != ProxyState.activePokemon._id);
        activePokemonService.clearActivePokemon();
    }
}

export const pcPokemonService = new PCPokemonService();