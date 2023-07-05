 
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.ability = pokeDetail.ability

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

/*
// Function to fetch and display Pokémon details
pokeApi.getPokemonDetails = (pokemon) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');
    const pokemonUrl = `${pokemon}/${pokemonName}`;
  
    try {
      const response = pokeApi.fetch(pokemon);
      const pokemonData = pokeApi.response.json();
  
      // Create HTML elements to display Pokémon details
      const pokemonDetailsContainer = document.getElementById('pokemonDetails');
  
      const nameElement = document.createElement('h2');
      nameElement.innerText = pokemonData.name;
  
      const spriteElement = document.createElement('img');
      spriteElement.src = pokemonData.sprites.front_default;
      spriteElement.alt = `${pokemonData.name} sprite`;
  
      const abilitiesElement = document.createElement('h3');
      abilitiesElement.innerText = 'Abilities:';
  
      const abilitiesList = document.createElement('ul');
      pokemonData.abilities.forEach(ability => {
        const abilityItem = document.createElement('li');
        abilityItem.innerText = ability.ability.name;
        abilitiesList.appendChild(abilityItem);
      });
  
      const battleDetailsElement = document.createElement('div');
      battleDetailsElement.innerHTML = `<h3>Battle Details:</h3>
                                        <p>Base Experience: ${pokemonData.base_experience}</p>
                                        <p>Height: ${pokemonData.height}</p>
                                        <p>Weight: ${pokemonData.weight}</p>`;
  
      const rarityElement = document.createElement('div');
      rarityElement.innerHTML = `<h3>Rarity:</h3>
                                 <p>${pokemonData.species.rarity}</p>`;
  
      const ratingsElement = document.createElement('div');
      ratingsElement.innerHTML = `<h3>Ratings:</h3>
                                  <ul>${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}</ul>`;
  
      pokemonDetailsContainer.appendChild(nameElement);
      pokemonDetailsContainer.appendChild(spriteElement);
      pokemonDetailsContainer.appendChild(abilitiesElement);
      pokemonDetailsContainer.appendChild(abilitiesList);
      pokemonDetailsContainer.appendChild(battleDetailsElement);
      pokemonDetailsContainer.appendChild(rarityElement);
      pokemonDetailsContainer.appendChild(ratingsElement);
    } catch (error) {
      console.error('Error:', error);
    }
  }


// Check if the page is the Pokémon details page
if (window.location.pathname.includes('pokemon.html')) {
    getPokemonDetails();
  } else {
    getPokemonList();
  }

//Função para retornar a index
function voltarPaginaAnterior() {
    history. back();
    document. getElementById("Voltar"). addEventListener("onclick", voltarPaginaAnterior);}

    */