import { ProxyState } from "../AppState.js";
import { pcPokemonService } from "../Services/PCPokemonService.js";
import { Pop } from "../Utils/Pop.js";

function _getPcPokemon()
{
    pcPokemonService.getAllPokemon();
}

function _drawPcPokemon()
{
    let pcPokemonTemplate = "";

    ProxyState.pcPokemon.forEach(pokemon => 
        {
            pcPokemonTemplate += 
            `
            <div class="d-flex justify-content-bewteen p-2 pc-pokemon-list-item selectable mb-3" onclick="app.activePokemonController.setActivePokemon('${pokemon._id}')">
                <img class="pokemon-img" src="${pokemon.img}" />
                <h3>${pokemon.nickName}</h3>
            </div>
            `;
        });

    document.getElementById("pc-pokemon-list").innerHTML = pcPokemonTemplate;
}

export class PCPokemonController
{
    constructor()
    {
        ProxyState.on("pcPokemon", _drawPcPokemon);
        _getPcPokemon();
    }

    catchPokemon()
    {
        try
        {
            pcPokemonService.catchPokemon();
        }
        catch(error)
        {
            console.error("[CATCH POKEMON ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }

    async releasePokemon()
    {
        try
        {
            if(await Pop.confirm(`Really release ${ProxyState.activePokemon.nickName}?`, "This cannot be undone", "warning"))
            {
                pcPokemonService.releasePokemon();
            }
        }
        catch(error)
        {
            console.error("[RELEASE POKEMON ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }
}