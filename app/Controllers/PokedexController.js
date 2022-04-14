import { ProxyState } from "../AppState.js";
import { activePokemonService } from "../Services/ActivePokemonService.js";
import { pokedexService } from "../Services/PokedexService.js";
import { Pop } from "../Utils/Pop.js";

function _getPokedex()
{
    try
    {
        pokedexService.getAllPokemon();
    }
    catch(error)
    {
        console.error("[GET POKEDEX ERROR]", error.message);
        Pop.toast(error.message, "error");
    }
}

function _drawPokedex()
{
    let pokedexTemplate = "";

    ProxyState.filteredPokedex.forEach(pokemon => 
        {
            pokedexTemplate +=
            `
            <ul class="list-group list-group-flush">
                <button class="list-group-item list-group-item-action" onclick="app.pokedexController.setActivePokemon('${pokemon.name}')">${pokemon.name}</button>
            </ul>
            `;
        })

    document.getElementById("pokedex-list").innerHTML = pokedexTemplate;
}

export class PokedexController
{
    constructor()
    {
        ProxyState.on("filteredPokedex", _drawPokedex);
        _getPokedex();
    }

    async setActivePokemon(pokemonName)
    {
        try
        {
            const pokemonURL = ProxyState.pokedex.find(pokemon => pokemon.name === pokemonName).url;
            const newPokemon = await pokedexService.getPokemonByURL(pokemonURL);
            bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("pokedex-offcanvas")).hide();
            activePokemonService.setActivePokemon(newPokemon);
        }
        catch(error)
        {
            console.error("[SET ACTIVE POKEMON ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }

    searchPokedex()
    {
        try
        {
            const searchTerm = document.getElementById("pokedex-search").value.toLowerCase();
            pokedexService.searchPokedex(searchTerm);
        }
        catch(error)
        {
            console.error("[POKEDEX SEARCH ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }
}