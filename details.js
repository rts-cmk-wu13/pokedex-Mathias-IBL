let search = window.location.search;
let params = new URLSearchParams(search);
console.log(params);
let pokename = params.get("name");

console.log(pokename);


let sectionElm = document.createElement("section");

fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
.then(response => {
    if (!response.ok) {
        throw new Error("Den findes ikke!!!");
    }
    return response.json();
})
.then(pokemon => {
    console.log(pokemon);
    
    const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    
    sectionElm.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${artworkUrl}" alt="${pokemon.name}">
            <p>Weight: ${pokemon.weight / 10}kg</p>
            <p>Height: ${pokemon.height / 10}m</p>
            <p>Moves: ${pokemon.abilities.map(function(ability){
                return `<span>${ability.ability.name}</span>`;
            }).join(" ")}</p>

            <p>Stats: ${pokemon.stats.map(function(stat) {
                return `<span>${stat.stat.name}: ${stat.base_stat}</span>`;
            }).join(" ")}</p>
            
        `;
    })
    .catch(function(error) {
        console.log(error);
        
        sectionElm.innerHTML = `
            <h2>${error.message}</h2>
            <p>Go back to the <a href="index.html">details view</a></p>`;
    });

document.querySelector("main").append(sectionElm);
