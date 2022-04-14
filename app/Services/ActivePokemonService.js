import { ProxyState } from "../AppState.js";

class ActivePokemonService
{
    setActivePokemon(newPokemon)
    {
        ProxyState.activePokemon = newPokemon;
    }

    changeNickname(newNickname)
    {
        ProxyState.activePokemon.nickName = newNickname;
        ProxyState.activePokemon = ProxyState.activePokemon;
    }
    
    clearActivePokemon()
    {
        ProxyState.activePokemon = null;
    }
}

export const activePokemonService = new ActivePokemonService();