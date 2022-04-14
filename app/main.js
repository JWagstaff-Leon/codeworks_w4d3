import { ActivePokemonController } from "./Controllers/ActivePokemonController.js";
import { PCPokemonController } from "./Controllers/PCPokemonController.js";
import { PokedexController } from "./Controllers/PokedexController.js";

class App
{
    pokedexController = new PokedexController();
    pcPokemonController = new PCPokemonController();
    activePokemonController = new ActivePokemonController();
}

window["app"] = new App();
