export class Pokemon
{
    constructor(data)
    {
        this._id = data._id;
        this.name = data.name;
        this.nickName = data.nickName || data.name[0].toUpperCase() + data.name.substring(1);
        this.img = data.img || data.sprites.other["official-artwork"].front_default;
        this.weight = data.weight;
        this.height = data.height;
        this.types = data.types;
    }

    get Template()
    {
        return `
        <div class="d-flex flex-column bg-light text-dark py-2 px-3">
            <div class="d-flex justify-content-between p-2">
                <div>
                    <input id="active-nickname" class="nickname-edit fs-2" ${this.nickName.toLowerCase() === this.name ? "style='text-transform: capitalize;' value='" + this.name + "'" : "value='" + this.nickName + "'"}  onchange="app.activePokemonController.changeNickname()">
                    <h5 style="text-transform: capitalize;" class="fst-italic text-secondary ${this.nickName.toLowerCase() === this.name ? "d-none" : ""}">${this.name}</h5>
                </div>
                <img class="pokemon-img" src="${this.img}" />
            </div>
            <div class="d-flex justify-content-between mt-3 p-2">
                <h5>Height: ${this.height}</h5>
                <h5>Weight: ${this.weight}</h5>
                <h5>Types: ${this.typesString}</h5>
            </div>
            <div>
                ${this.Button}
            </div>
        </div>
        `;
    }

    get Button()
    {
        return `<button class="btn btn-${this._id ? "danger" : "success"}" onclick="app.pcPokemonController.${this._id ? "release" : "catch"}Pokemon()">${this._id ? "Release" : "Catch"} this pokemon</button>`
    }
}