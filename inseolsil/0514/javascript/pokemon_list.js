// You may want to define global variables if necessary

const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
};

window.addEventListener("load", initPokemonList);
window.addEventListener("scroll", scrollPokemonList);   


async function initPokemonList() {
    await fetchData();

    // DO NOT remove below.
    // You should finish fetching data before this point.
    // Make use of async-await or promise to this end.
    loadingCompletion();
    displayPokemonList();
}



/** 
 * Collect 800 pokemon (i.e., their ids are 1 - 800) data
 * For each pokemon item, fetch the following data
 * id, name, types, image url
 * Note. Each pokemon item has one type or two types. 
 */
let pokemons = [];

async function fetchData() {
    // TODO: Fetch all the data using Poke API
    // Recommed to store data in array type variable(s)
    // Feel free to add any functions if you need
    const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=800";
    try {
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();
        
        const pokemonPromises = data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const details = await response.json();
            return {
                id: details.id,
                name: details.name,
                types: details.types.map(type => type.type.name),
                image: details.sprites.front_default
            };
        });

        pokemons = await Promise.all(pokemonPromises);
        displayPokemonList();
    } catch (error) {
        console.error("포켓몬 데이터를 가져오는 데 실패했습니다: ", error);
    }



}


/** 
 * hide loading div after completion 
 * This also calls displayPokemonList() that starts rederding Pokemon items on screen.
 */
function loadingCompletion() {
    const loadingDiv = document.getElementById('loading-div');
    loadingDiv.classList.add('hideLoading');

    setTimeout(function() {
        loadingDiv.classList.replace('hideLoading', 'hide');
        document.body.style.overflow = 'unset';
    }, 500);
};


/**
 * Initially, your code should display a pokemon list of 30 items (out of total 800 items). 
 * Wheneve a user scroll down, an addition 30 items should be displayed.
 */
let currentIndex = 0;

function displayPokemonList(){
    // TODO: Write your code necessary
    // Feel free to add any functions if you need
    const container = document.getElementById('pokedex-list-render-container');
    const maxIndex = pokemons.length;
    const endIndex = currentIndex + 30; 

    for (let i = currentIndex; i < endIndex && i < maxIndex; i++) {
        const pokemon = pokemons[i];
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon-render-result-container container center column';

        pokemonDiv.innerHTML = `
            <img class="search-pokemon-image" src="${pokemon.image}" alt="${pokemon.name}">
            <span class="bold font-size-12">#${pokemon.id}</span>
            <h3>${dressUpPayloadValue(pokemon.name)}</h3>
            ${getTypeContainers(pokemon.types)}
        `;

        pokemonDiv.addEventListener('click', () => openInfo(pokemon.id));

        container.appendChild(pokemonDiv);
    }

    currentIndex = endIndex;

}



/**
 * add new scroll pokemon when bottom is reached 
 * Wheneve a user scroll down, an addition 30 items should be displayed
 * until all the 800 items are shown.
 */
function scrollPokemonList() {
    // TODO: Write your code necessary
    // Feel free to add any functions if you need
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (currentIndex < pokemons.length) {
            displayPokemonList();
        }
    }

};







/**
 * --- HELPER FUNCTIONS, Style --- 
 */
/** 
 * get type containers for pokemon infos 
 */
function getTypeContainers(typesArray) {
    let htmlToReturn = '<div class="row">';

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn += `<div class="type-container" style="background: ${typeColors[typesArray[i]]};">
                            ${dressUpPayloadValue(typesArray[i])}
                        </div>`;
    };

    return htmlToReturn + '</div>';
};

/** 
 * dress up payload value
 */
function dressUpPayloadValue(string) {
    let splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};



/* --- HELPER FUNCTIONS, Alias--- */

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} name - element ID.
 * @returns {object} - DOM object associated with id.
 */
function id(name) {
    return document.getElementById(name);
  }
  
  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }
  
  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }