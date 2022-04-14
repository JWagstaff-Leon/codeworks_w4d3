import { ProxyState } from "../AppState.js";
import { activePokemonService } from "../Services/ActivePokemonService.js";
import { Pop } from "../Utils/Pop.js";

function _drawActivePokemon()
{
    if(ProxyState.activePokemon)
    {
        document.getElementById("active-pokemon").innerHTML = ProxyState.activePokemon.Template;
    }
    else
    {
        document.getElementById("active-pokemon").innerHTML = "";
    }
}

export class ActivePokemonController
{
    constructor()
    {
        ProxyState.on("activePokemon", _drawActivePokemon);
    }

    setActivePokemon(id)
    {
        try
        {
            const newActivePokemon = ProxyState.pcPokemon.find(pokemon => pokemon._id === id);
            activePokemonService.setActivePokemon(newActivePokemon);
        }
        catch(error)
        {
            console.error("[SET ACTIVE POKEMON ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }

    changeNickname()
    {
        try
        {
            const newNickname = document.getElementById("active-nickname").value;
            activePokemonService.changeNickname(newNickname);
        }
        catch(error)
        {
            console.error("[NICKNAME CHANGE ERROR]", error.message);
            Pop.toast(error.message, "error");
        }
    }
}