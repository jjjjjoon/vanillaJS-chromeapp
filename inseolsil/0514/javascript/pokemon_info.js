/**
 * open info when pokemon from list is clicked 
 */
function openInfo(id) {
    document.getElementById('current-pokemon-empty').classList.add('hide');

    if(window.innerWidth > 1100){
        slideOutPokemonInfo();

        setTimeout(function(){
            initPokemonInfo(id);
        }, 350);
    } else {
        initPokemonInfo(id);
    };
};

async function initPokemonInfo(id) {
    await fetchPokemonInfo(id);
    await updateCurrentPokemonImage(id);

    // DO NOT remove below.
    // You should finish fetching data before this point.
    // Make use of async-await or promise to this end.
    slideInPokemonInfo();
        
    if(window.innerWidth < 1100){
        openPokemonResponsiveInfo();
    };
}

/**
 * fetch pokemon infos 
 */
async function fetchPokemonInfo(id) {
    // TODO: Write your code necessary
    // Feel free to add any functions if you need
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    try {
        const [pokemonRes, speciesRes] = await Promise.all([
            fetch(pokemonUrl),
            fetch(speciesUrl)
        ]);
        const pokemon = await pokemonRes.json();
        const species = await speciesRes.json();

        const info = {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(t => t.type.name).join(', '),
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities.map(a => a.ability.name).join(', '),
            stats: {
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                specialAttack: pokemon.stats[3].base_stat,
                specialDefense: pokemon.stats[4].base_stat,
                speed: pokemon.stats[5].base_stat,
                total: pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
            },
            description: species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text,
            evolutionChainUrl: species.evolution_chain.url
        };

        updatePokemonDetails(info);
        await updateEvolutionImages(info.evolutionChainUrl);
    } catch (error) {
        console.error("포켓몬 정보를 가져오는 데 실패했습니다: ", error);
    }
}

async function updateEvolutionImages(evolutionChainUrl) {
    const response = await fetch(evolutionChainUrl);
    const evolutionData = await response.json();
    let current = evolutionData.chain;

    try {
        const evolutionIds = [];
        while (current && current.species) {
            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);
            const speciesData = await speciesResponse.json();
            evolutionIds.push(speciesData.id);
            current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
        }

        for (let i = 0; i < evolutionIds.length; i++) {
            const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionIds[i]}`);
            const evolutionPokemon = await evolutionResponse.json();
            const imageElementId = `current-pokemon-evolution-${i}`;
            document.getElementById(imageElementId).src = evolutionPokemon.sprites.front_default || './src/pokeball-icon.png';
        }
    } catch (error) {
        console.error("진화 이미지를 가져오는 데 실패했습니다: ", error);
    }
}

function updatePokemonDetails(info) {
    document.getElementById('current-pokemon-id').textContent = `#${info.id}`;
    document.getElementById('current-pokemon-name').textContent = info.name;
    document.getElementById('current-pokemon-types').innerHTML = getTypeContainers(info.types.split(', '));
    document.getElementById('current-pokemon-description').textContent = info.description;
    document.getElementById('current-pokemon-height').textContent = `${info.height} dm`;
    document.getElementById('current-pokemon-weight').textContent = `${info.weight} hg`;

    document.getElementById('current-pokemon-abilitiy-0').textContent = info.abilities.split(', ')[0];
    const ability1Element = document.getElementById('current-pokemon-abilitiy-1');
    if (info.abilities.split(', ')[1]) {
        ability1Element.textContent = info.abilities.split(', ')[1];
        ability1Element.parentElement.classList.remove('hide');
    } else {
        ability1Element.parentElement.classList.add('hide');
    }

    document.getElementById('current-pokemon-stats-hp').textContent = info.stats.hp;
    document.getElementById('current-pokemon-stats-atk').textContent = info.stats.attack;
    document.getElementById('current-pokemon-stats-def').textContent = info.stats.defense;
    document.getElementById('current-pokemon-stats-spa').textContent = info.stats.specialAttack;
    document.getElementById('current-pokemon-stats-spd').textContent = info.stats.specialDefense;
    document.getElementById('current-pokemon-stats-speed').textContent = info.stats.speed;
    document.getElementById('current-pokemon-stats-total').textContent = info.stats.total;

    document.getElementById('current-pokemon-info').classList.remove('hide');
}


/**
 * update pokemon image & adjust height to varying sprite dimensions 
 * ---> (to position directly above info) 
 */
async function updateCurrentPokemonImage(id) {
    // TODO: Write your code necessary
    // Feel free to add any functions if you need
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();
        const imageUrl = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;

        if (imageUrl) {
            const imageElement = document.getElementById('current-pokemon-image');
            imageElement.src = imageUrl;
            imageElement.style.height = '300px';
        } else {
            console.log("이미지를 찾을 수 없습니다.");
        }
    } catch (error) {
        console.error("포켓몬 이미지를 가져오는 데 실패했습니다: ", error);
    }
}

/**
 * --- HELPER FUNCTIONS, Responsive --- 
 */
function setupResponsiveBackground(pokemon) {
    document.getElementById('current-pokemon-responsive-background').style.background = typeColors[pokemon.types[0].type.name];
}

function openPokemonResponsiveInfo() {
    document.getElementById('current-pokemon-container').classList.remove('hide');
    document.getElementById('current-pokemon-container').style.display = 'flex';
    document.getElementById('current-pokemon-responsive-close').classList.remove('hide');
    
    document.getElementById('current-pokemon-responsive-background').classList.remove('hide');
    document.getElementById('current-pokemon-responsive-background').style.opacity = 0;
    setTimeout(function() {
        document.getElementById('current-pokemon-responsive-background').style.opacity = 1;
    }, 20);

    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
}

function closePokemonInfo() {
    setTimeout(function() {
        document.getElementById('current-pokemon-container').classList.add('hide');
        document.getElementById('current-pokemon-responsive-close').classList.add('hide');
        
        document.getElementById('current-pokemon-responsive-background').classList.add('hide');
    }, 350);

    document.getElementById('current-pokemon-responsive-background').style.opacity = 1;
    setTimeout(function() {
        document.getElementById('current-pokemon-responsive-background').style.opacity = 0;
    }, 10);

    document.getElementsByTagName('html')[0].style.overflow = 'unset';
}

/**
 * --- HELPER FUNCTIONS, Animations ---
 */
function slideOutPokemonInfo() {
    document.getElementById('current-pokemon-container').classList.remove('slide-in');
    document.getElementById('current-pokemon-container').classList.add('slide-out');
}

function slideInPokemonInfo() {
    document.getElementById('current-pokemon-container').classList.add('slide-in');
    document.getElementById('current-pokemon-container').classList.remove('slide-out');
}
