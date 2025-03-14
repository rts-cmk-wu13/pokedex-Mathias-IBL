let search = window.location.search;
let params = new URLSearchParams(search);
let pokename = params.get("name");

let sectionElm = document.createElement("section");

const typeColors = {
    normal: '#AAA67F',
    fire: '#F57D31',
    water: '#6493EB',
    electric: '#F9CF30',
    grass: '#74CB48',
    ice: '#9AD6DF',
    fighting: '#C12239',
    poison: '#A43E9E',
    ground: '#DEC16B',
    flying: '#A891EC',
    psychic: '#FB5584',
    bug: '#A7B723',
    rock: '#B69E31',
    ghost: '#70559B',
    dragon: '#7037FF',
    dark: '#75574C',
    steel: '#B7B9D0',
    fairy: '#E69EAC'
};

function getPrimaryTypeColor(pokemonTypes) {
    return typeColors[pokemonTypes[0]];
}

fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
  .then(response => {
    if (!response.ok) {
        throw new Error(`The Pokémon ${pokename} doesn't exist!`);
    }
    return response.json();
  })
  .then(pokemon => {
    const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;


    const types = pokemon.types.map(type => type.type.name);
    const primaryTypeColor = getPrimaryTypeColor(types);
    
    // Function to lighten the color by blending it with white
function lightenColor(hex, percent) {
    // Remove the '#' from hex color
    let hexColor = hex.replace('#', '');
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);

    // Blend with white (255, 255, 255)
    r = Math.round(r + (255 - r) * percent);
    g = Math.round(g + (255 - g) * percent);
    b = Math.round(b + (255 - b) * percent);

    // Convert the new RGB values back to hex format
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

// Example: Lighten the color by 20%
let lighterColor = lightenColor(primaryTypeColor, 0.6); // 0.6 represents 60% lighter



    document.body.style.backgroundColor = primaryTypeColor;

    sectionElm.innerHTML = `
      <a href="index.html"><button>Back</button></a>
      <p>#${pokemon.id}</p>
      <h2 style="color: white;">${pokemon.name}</h2>
      <img src="${artworkUrl}" alt="${pokemon.name}">
      <div style="background-color: white; padding: 1rem; border-radius: 8px;">
        <p>Weight: ${pokemon.weight / 10} kg</p>
        <p>Height: ${pokemon.height / 10} m</p>
        <p>Types: ${types.map(type => `<span style="background-color: ${typeColors[type]}; color: white; padding: 0.5rem; margin: 0.2rem; border-radius: 5px;">${type}</span>`).join(' ')}</p>
        <p>Abilities: ${pokemon.abilities.map(function(ability){
            return `<span>${ability.ability.name}</span>`;
        }).join(" ")}</p>

<p>${pokemon.stats.map(function(stat) {
    const statWidth = (stat.base_stat / 255) * 100;
    return `
              <span>${stat.stat.name}: ${stat.base_stat}</span>
              <div class style="width: 100%; background-color: ${lighterColor}; border-radius: 10px; overflow: hidden;">
                  <div style="width: ${statWidth}%; background-color: ${primaryTypeColor}; height: 20px;"></div>
                </div><br>
                `;
      }).join(" ")}</p>
      </div>
    `;
  }).catch(function(error) {
    console.log(error);
    sectionElm.innerHTML = `
      <h2>${error.message}</h2>
      <p>Go back to the <a href="index.html">details view</a></p>
    `;
  });

document.querySelector("main").append(sectionElm);
