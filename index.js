// grab the things we need ----------
const pokemonContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");

console.log(inputEl);

// listen for user events -------------
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML = "";
  getPokemon(inputEl.value);
});

// define our functions/actions ------------
async function getPokemon(name = "bulbasaur") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  pokemonEl.innerHTML = `
    <div class="info">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png" width="200">
<h2>${pokemon.name}</h2>
    </div>

    <div class="stats">
      ${pokemon.stats
        .map((stat) => {
          return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
        })
        .join("")}
    </div>
    <div>
    ${pokemon.abilities
      .map((ability) => {
        return `<p>${ability.ability.name}</p>`;
      })
      .join("")}
    <div>
    <div>
    ${pokemon.moves
      .map((move) => {
        return `${move.move.name}  `;
      })
      .join("")}
    <div>
  `;

  pokemonContainer.appendChild(pokemonEl);
}

// run things ----------------
getPokemon();
