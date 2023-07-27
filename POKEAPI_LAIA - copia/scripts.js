async function pokeapi(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
}

const pokeData = await pokeapi("https://pokeapi.co/api/v2/pokemon?limit=50");

async function loadTemplate(templateSearch) {
  const response = await fetch("templates.html");
  const templates = document.createElement("template");
  templates.innerHTML = await response.text();
  console.log(templates);
  const template = templates.content.getElementById(templateSearch);
  return template.content;
}

async function carregarPokemon(pokemonData) {
  const smallTemplate = await loadTemplate("pokemonCardSmall");
  const nodeSmallTemplate = smallTemplate.cloneNode(true);

  const pokemonNameArray = pokemonData.url.split("/");
  const pokedexNumber = pokemonNameArray[pokemonNameArray.length - 2];
  console.log(pokedexNumber);

  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokedexNumber}.svg`;

  nodeSmallTemplate.getElementById("pokemonImage").src = pokemonImageURL;
  nodeSmallTemplate.querySelector("#pokemonName").textContent =
    pokemonData.name;

  document.getElementById("pokemonList").appendChild(nodeSmallTemplate);
}

pokeData.map((pokemon) => carregarPokemon(pokemon));

// començo a fer el canvi del fons de les targetes

const background = document.querySelectorAll(".cardSmall");
