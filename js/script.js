/**
 * 
 * Retreive data from [4] PokeAPI. https://pokeapi.co/. Accessed 18 Jan. 2025.
 * This data is used to display Pokemon details for several pages on OakDB.
 */

const documentBody = document.querySelector('body');
const dataDiv = document.querySelector('#pokemon-grid');
const seeMoreBtn = document.querySelector('#see-more-btn');

let page = 1;
const itemsPerPage = 20;
const offset = (page - 1) * itemsPerPage;

let url;
let paginatedUrl;
let searchType = "";
let filterData = "";

/**
 * Load all Pokemon.
 */
async function loadAll() {
    const offset = (page - 1) * itemsPerPage;
    /*
    * [9] Javascript Pagination. James Q Quick. 
    * https://www.youtube.com/watch?v=Ynp6Gdd3XVE. 
    * Accessed Jan 25 2025.
    */
    paginatedUrl = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;

    try {
        const paginatedData = await getData(paginatedUrl);
        for (let i = 0; i < paginatedData['results'].length; ++i){
            url = paginatedData['results'][i]['url'];

            const data = await getData(url);
            fillGrid(data);
            seeMoreBtn.style.display="block";
        }

    } catch (err) {
        console.error(err);
        dataDiv.innerHTML = "<p>An error has occured. Please try again.</p>";
    }
}

/**
 * Load Favorite Pokemon
 */
async function loadFavorites() {
    let favorites = JSON.parse(sessionStorage.getItem('favoritePokemon'));
    let url;
    
    if (favorites) {
        try {
            for (let i = 0; i < favorites.length; ++i){
                url = `https://pokeapi.co/api/v2/pokemon/${favorites[i]}`;
                const data = await getData(url);
                fillGrid(data);
            }
        } catch (err) {
            console.error(err);
            dataDiv.innerHTML = "<p>An error has occured. Please try again.</p>";
        }
    }
}

/**
 * Load this Pokemon's details.
 */
async function loadDetails() {
    const id = JSON.parse(sessionStorage.getItem("pokemon-link-id"));
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    // Populate the data into the HTML
    try {
        const data = await getData(url);
        populateDetails(data);
    } catch (err){
        console.error(err);
    }
}

/**
 * Populate the page with this Pokemon's details.
 * @param {*} data Data recieved from the API call for this Pokemon.
 */
async function populateDetails(data){

    // Image
    const imgContainter = document.getElementById("pokemon-img");
    const imgPath = data.sprites.other["official-artwork"]["front_default"];

    const img = document.createElement("img");
    img.className = "img-fluid";
    img.src = imgPath;
    img.alt = "Image of a Pokemon";
    imgContainter.appendChild(img);

    // General Details
    const generalListContainer = document.getElementById("general-details");
    
    let type = "";
    for (let i = 0; i < data.types.length; ++i){
        if (i > 0){
            type += " and ";
        }
        type += capitalizeFirstLetter(data.types[i].type.name);
    }

    const generalDetails = [
        {label: 'Id', value: data.id},
        {label: 'Name', value: capitalizeFirstLetter(data.name)},
        {label: 'Type', value: type},
        {label: 'Height', value: data.height},
        {label: 'Weight', value: data.weight},
        {label: 'Base Exp', value: data.base_experience}
    ];

    generalDetails.forEach(entry => {
        let listEntry = document.createElement("li");
        listEntry.className = "list-group-item";

        let strongTag = document.createElement("strong");
        strongTag.appendChild(document.createTextNode(`${entry.label}: `));
        let textData = document.createTextNode(entry.value);

        listEntry.appendChild(strongTag);
        listEntry.appendChild(textData);
        generalListContainer.appendChild(listEntry);
    });

    // Stat Details
    const statListContainer = document.getElementById("stat-details");
    const stats = data.stats;
    let statDetails = [];

    stats.forEach(stat => {
        statDetails.push(
            {label: capitalizeFirstLetter(stat.stat['name']), value: stat.base_stat}
        );
    });

    statDetails.forEach(entry => {
        let listEntry = document.createElement("li");
        listEntry.className = "list-group-item";

        let strongTag = document.createElement("strong");
        strongTag.appendChild(document.createTextNode(`${entry.label}: `));
        let textData = document.createTextNode(entry.value);

        listEntry.appendChild(strongTag);
        listEntry.appendChild(textData);
        statListContainer.appendChild(listEntry);
    });

    // Evolution Chain
    const evolutionChain = await getEvolutionChain(data.id);
    const pokemonData = await Promise.all(
        evolutionChain.map(evolution => getData(`https://pokeapi.co/api/v2/pokemon/${evolution}`))
    );

    const evolutionsContainer = document.getElementById("evolution-data");

    pokemonData.forEach(entry => {
        const imgPath = entry.sprites['front_default'];

        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList = "d-flex flex-column justify-content-center align-items-center";

        const pokemonSprite = document.createElement("img");
        pokemonSprite.src = imgPath;

        const pokemonName = document.createElement("p");
        pokemonName.appendChild(document.createTextNode(capitalizeFirstLetter(entry.name)));

        // Full Details button
        const detailsLink = document.createElement("a");
        detailsLink.href = "details.html";
        detailsLink.id = entry.id;
        detailsLink.className = "btn btn-primary pokemon-link";
        const detailsText = document.createTextNode("Full Details");
        detailsLink.appendChild(detailsText);

        pokemonDiv.appendChild(pokemonSprite);
        pokemonDiv.appendChild(pokemonName);
        pokemonDiv.appendChild(detailsLink);
        evolutionsContainer.appendChild(pokemonDiv);
    });

    // Moves
    document.querySelectorAll(".version-dropdown-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            const selectedVersion = e.target.id;
            const dropdownMenu = document.getElementById('dropdown-menu-title');
            emptyContainer(dropdownMenu);
            dropdownMenu.appendChild(document.createTextNode(e.target.textContent));
            loadMoves(data, selectedVersion);
        });
    });
}

/**
 * Load the moves for this pokemon. 
 * This function will render the table based on which version the user selected.
 * @param {*} pokemon the pokemon whose moves are to be rendered.
 * @param {*} version the game version selected by the user to render the moves for.
 */
function loadMoves(pokemon, version){
    /**
     * [5] Javascript Array.filter() Documentation. 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 
     * Accessed 25 Jan. 2025.
     */
    const filteredMoves = pokemon.moves.filter(move => {

        const matchingGroup =  move.version_group_details.filter(group => group.version_group.name === version);

        // Add to the group only if there is a match
        if (matchingGroup.length > 0){
            move.version_group_details = matchingGroup;
            return true;
        }
        return false;
    });

    const formattedMoveData = filteredMoves.map(move => ({
        name: move.move.name,
        url: move.move.url,
        level: move.version_group_details[0].level_learned_at,
        method: move.version_group_details[0].move_learn_method.name
    }));

    formattedMoveData.sort((a,b) => a.level - b.level);

    const searchResult = document.getElementById('move-search-result');
    const tableBody = document.getElementById('move-table-body');
    emptyContainer(tableBody);

    if (!formattedMoveData.length > 0){
        searchResult.style.display = "block";
        return;
    }

    searchResult.style.display = "none";
    for (let i = 0; i < formattedMoveData.length; ++i){
        const row = document.createElement("tr");

        const header = document.createElement("th");
        header.scope = "row";
        header.appendChild(document.createTextNode(i));
        row.appendChild(header);

        const name = document.createElement("td");
        name.appendChild(document.createTextNode(formattedMoveData[i].name));
        row.appendChild(name);

        const level = document.createElement("td");
        level.appendChild(document.createTextNode(formattedMoveData[i].level));
        row.appendChild(level);

        const method = document.createElement("td");
        method.appendChild(document.createTextNode(formattedMoveData[i].method));
        row.appendChild(method);

        tableBody.appendChild(row);
    }
}

/**
 * Returns the pokemon's evolution line from an API call.
 * @param {*} pokemonId Id of the pokemon whose evolution line to search for.
 * @returns Array, names of pokemon in evolution line.
 */
async function getEvolutionChain(pokemonId){
    try {
        const speciesData = await getData(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const evolutionData = await getData(speciesData.evolution_chain.url);
        const evolutionLine = [];
        let currentPokemon = evolutionData.chain;

        while (currentPokemon){
            evolutionLine.push(currentPokemon.species['name']);
            currentPokemon = currentPokemon.evolves_to.length > 0 ? currentPokemon.evolves_to[0] : null;
        }

        return evolutionLine;

    } catch (err) {
        console.log("Error fetching evolution chain.")
    }
}
/**
 * Load only Pokemon from types selected by the user.
 * This data will be paginated based on the page number, offset, and number of items per page.
 * @param {*} data Full list of pokemon data already filtered by type
 */
async function loadTypeFilter(data){
    const offset = (page - 1) * itemsPerPage;

    try {
        for (let i = 0; i < itemsPerPage; ++i){
            fillGrid(data[i + offset]);
            seeMoreBtn.style.display = "block";
        }
    } catch (err){
        console.log(err);
        dataDiv.innerHTML = "<p>An error has occured. Please try again.</p>";
    }
}

/**
 * Initial loading operations
 * index.html : Load all Pokemon
 * favorites.html : Load favorite Pokemon
 * details.html : Load the details for selected Pokemon
 */
if (documentBody.classList.contains('pokemon-search-page')){
    const filterDiv = document.getElementById('filters');
    const types = [
        'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
        'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
        'dark', 'fairy', 'stellar', 'unknown'
    ];

    types.forEach(type => {
        const div = document.createElement("div");
        div.className = "mx-2"

        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "mx-2";
        input.id = type;
        div.appendChild(input);

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = type;

        const labelText = document.createTextNode(capitalizeFirstLetter(type));
        label.appendChild(labelText);
        div.appendChild(label);

        filterDiv.appendChild(div);
    });

    loadAll();
    document.querySelector("#submit-btn").addEventListener('click', handleSearch);

} else if (documentBody.classList.contains('pokemon-favorites-page')){
    loadFavorites();

} else if (documentBody.classList.contains('pokemon-details-page')){

      // Move Details
      const versions = [
        {label: 'Red & Blue', value: 'red-blue'},
        {label: 'Yellow', value: 'yellow'},
        {label: 'Gold & Silver', value: 'gold-silver'},
        {label: 'Crystal', value: 'crystal'},
        {label: 'Ruby & Sapphire', value: 'ruby-sapphire'},
        {label: 'Emerald', value: 'emarald'},
        {label: 'Fire Red & Leaf Green', value: 'firered-leafgreen'},
        {label: 'Diamond & Pearl', value: 'diamond-pearl'},
        {label: 'Platinum', value: 'platinum'},
        {label: 'Heart Gold & Soul Silver', value: 'heartgold-soulsilver'},
        {label: 'Black & White', value: 'black-white'},
        {label: 'Colosseum', value: "colosseum"},
        {label: 'XD', value: 'xd'},
        {label: 'Black & White 2', value: 'black-2-white-2'},
        {label: 'X & Y', value: 'x-y'},
        {label: 'Omega Ruby & Alpha Sapphire', value: 'omega-ruby-alpha-sapphire'},
        {label: 'Sun & Moon', value: 'sun-moon'},
        {label: 'Ultra Sun & Ultra Moon', value: 'ultra-sun-ultra-moon'},
        {label: 'Let\'s Go', value: 'lets-go-pikachu-lets-go-eevee'},
        {label: 'Sword & Shield', value: 'sword-shield'},
        {label: 'Scarlet & Violet', value: 'scarlet-violet'}
    ];

    const versionOptionsContainer = document.getElementById('version-dropdown-options');

    versions.forEach(version => {
        const listEntry = document.createElement("li");

        const entryLink = document.createElement("a");
        entryLink.className = "dropdown-item version-dropdown-item";
        entryLink.id = version.value;
        entryLink.href = "#";

        entryLink.appendChild(document.createTextNode(version.label));
        listEntry.appendChild(entryLink);
        versionOptionsContainer.appendChild(listEntry);
    });

    loadDetails();
}

/**
 * Event listener for See More button.
 */
document.body.addEventListener("click", (e) => {
    if (e.target.id == "see-more-btn"){
        page++;
        if (searchType === 'type'){
            loadTypeFilter(filterData);
        } else {
            loadAll();
        }
    }
});

/**
 * Add Pokemon id to session storage when their link is clicked to be used on the details page.
 */
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("pokemon-link")){
        sessionStorage.setItem("pokemon-link-id", e.target.id);
    }
});

/**
 * Event listener for the favorite button
 */
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-btn")){
        const pokemonId = e.target.id;
        let favorites = JSON.parse(sessionStorage.getItem('favoritePokemon')) || [];
        let isFavorite = favorites.includes(pokemonId);

        if (isFavorite){
            
            // Remove this id from the list
            favorites = favorites.filter((id) => id !== pokemonId);
            sessionStorage.setItem('favoritePokemon', JSON.stringify(favorites));

            // Favorite Icon
            emptyContainer(e.target);
            const favoriteIcon = document.createElement("i");
            favoriteIcon.className ="ri-poker-hearts-line";
            e.target.appendChild(favoriteIcon);
            e.target.appendChild(document.createTextNode(" Favorite"));

        } else {
            // Add id to favorite list
            favorites.push(pokemonId);
            sessionStorage.setItem('favoritePokemon', JSON.stringify(favorites));
            
            emptyContainer(e.target);
            const favoriteIcon = document.createElement("i");
            favoriteIcon.className ="ri-poker-hearts-fill";
            e.target.appendChild(favoriteIcon);
            e.target.appendChild(document.createTextNode(" Remove"));
        }
    }
});


/**
 * Function to handle searching Pokemon.
 * User can search either 'pokemon name' or 'one or more types of pokemon'
 * @param {*} e Event triggered when search button is clicked.
 * @returns No value, load all pokemon if no search has been queried.
 */
async function handleSearch(e) {
    e.preventDefault();
    page = 1;
    const filterDiv = document.getElementById("filters");
    const checkboxes = filterDiv.querySelectorAll("input[type='checkbox']");

    /**
     *  [6] Javascript Array.from() Documentation. 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
     * Accessed 25 Jan. 2025.
     * */
    const checkedValues = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    /**
     * [7] Javascript Array.map() Documentation. 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
     * Accessed 25 Jan. 2025
     * 
     *  iterates over an array and applies a function to each element, 
     *  returning a new array with the transformed results.
     */
    .map((checkbox) => checkbox.id);

    if (document.querySelector("#pokemon-search").value) {
        searchType = "pokemon";

    } else if (checkedValues.length > 0) {
        searchType = 'type';

    } else {
        emptyContainer(dataDiv);
        loadAll();
        return;
    }

    // Searching for one Pokemon
    if (searchType === "pokemon"){
        try {
            let pokemon = document.querySelector("#pokemon-search").value.toLowerCase();
            url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

            const data = await getData(url);
            emptyContainer(dataDiv);
            fillGrid(data);
            seeMoreBtn.style.display="none";
        } catch (err){
            console.error(err);
            const dataDiv = document.querySelector('#pokemon-grid');
            dataDiv.innerHTML = "<p>Search did not return any results.</p>"
        }

    // Searching for one or more types    
    } else if (searchType === "type") {
        try {
        let url = 'https://pokeapi.co/api/v2/type';
        const pokemonList = [];
        const typeData = await getData(url);
    
        // Map for types and urls
        const typeMap = typeData.results.map(type => ({
            name: type.name,
            url: type.url
        }));

        // Filter only selected types
        const selectedTypeUrls = checkedValues
        .map(typeName => typeMap.find(type => type.name === typeName))
            .filter(type => type)
            .map(type => type.url);
        /**
         * [8] Javascript Promise.all() Documentation 
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all 
         * Accessed 26 Jan. 2025.
         * 
         * Fetch all data in parallel. This will return data after all promises are fulfilled.
         */
        const typeDetails = await Promise.all(
            selectedTypeUrls.map(typeUrl => getData(typeUrl))
        );
    
        // List of pokemon and their urls
        typeDetails.forEach(typeDetail => {
            typeDetail.pokemon.forEach(pokemonEntry => {
                pokemonList.push(pokemonEntry);
            });
        });
    
         const pokemonData = await Promise.all(
         pokemonList.map(entry => getData(entry.pokemon.url))
         );

         pokemonData.sort((a,b) => a.id - b.id);

        emptyContainer(dataDiv);
        filterData = pokemonData;
        loadTypeFilter(filterData);

        } catch (err) {
            console.error(err);
            const dataDiv = document.querySelector('#pokemon-grid');
            dataDiv.innerHTML = "<p>Search did not return any results.</p>"
        }
    }
}

/**
 * Fetching data from one API endpoint
 * @param {*} url URL of the API endpoint
 * @returns json data that we requested
 */
async function getData(url) {
    const response = await fetch(url);
    if (!response.ok){
        throw new Error("Request could not be completed.");
    }
    const data = response.json();
    return data;
}

/**
 * Function to capitalize the first character in a string.
 * @param {*} val String value to capitalize
 * @returns String with the first character capitalized.
 */
function capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

/**
 * Function to clear the child data in the grid.
 * @param {*} container Container to clear children from
 */
function emptyContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Function that fills the grid with data from the Pokemon API.
 * The default display grid will only require pokemon artwork, pokemon name, id, and types.
 * This is used on the search page, and the favorites page. NOT the Details page.
 * @param {*} data Data recieved from the Pokemon API to use to fill the grid.
 */
function fillGrid(data) {
    const imgPath = data.sprites.other["official-artwork"]["front_default"];
    const pokemonName = capitalizeFirstLetter(data.name);
    const id = data.id;
    let favorites = JSON.parse(sessionStorage.getItem('favoritePokemon')) || [];
    let isFavorite = favorites.includes(`${id}`);

    // Some pokemon have more than one type
    let type = "";
    for (let i = 0; i < data.types.length; ++i){
        if (i > 0){
            type += " and ";
        }
        type += capitalizeFirstLetter(data.types[i].type.name);
    }

    const colDiv = document.createElement("div");
    colDiv.className = "col";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow";

    const imgElement = document.createElement("img");
    imgElement.src = imgPath;
    imgElement.className = "card-img-top";
    imgElement.alt = "Image of a Pokemon";

    cardDiv.appendChild(imgElement);

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const titleElement = document.createElement("h5");
    titleElement.className = "card-title";
    const titleText = document.createTextNode(pokemonName);
    titleElement.appendChild(titleText);

    cardBodyDiv.appendChild(titleElement);

    const textElement = document.createElement("p");
    textElement.className = "card-text";
    const textContent = `Pokemon number ${id}. ${pokemonName}'s type is ${type}.`;
    const textNode = document.createTextNode(textContent);
    textElement.appendChild(textNode);

    cardBodyDiv.appendChild(textElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex flex-column flex-md-row gap-2";

    const detailsLink = document.createElement("a");
    detailsLink.href = "details.html";
    detailsLink.id = id;
    detailsLink.className = "btn btn-primary pokemon-link";
    const detailsText = document.createTextNode("Full Details");
    detailsLink.appendChild(detailsText);

    buttonContainer.appendChild(detailsLink);

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.id = id;
    favoriteButton.className = "btn btn-danger favorite-btn";

    if (isFavorite){
        // Favorite Icon
        const favoriteIcon = document.createElement("i");
        favoriteIcon.className ="ri-poker-hearts-fill";
        favoriteButton.appendChild(favoriteIcon);
        // Favorite Text
        const favoriteText = document.createTextNode(" Remove");
        favoriteButton.appendChild(favoriteText);
    } else {
        // Favorite Icon
        const favoriteIcon = document.createElement("i");
        favoriteIcon.className ="ri-poker-hearts-line";
        favoriteButton.appendChild(favoriteIcon);
        // Favorite Text
        const favoriteText = document.createTextNode(" Favorite");
        favoriteButton.appendChild(favoriteText);
    }

    buttonContainer.appendChild(favoriteButton);
    cardBodyDiv.appendChild(buttonContainer);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    dataDiv.appendChild(colDiv);
}
