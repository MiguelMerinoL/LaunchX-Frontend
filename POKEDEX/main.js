// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeSprite = document.querySelector('.poke-sprite-image');
const poke3DImage = document.querySelector('.poke-3D-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeMoveOne = document.querySelector('.poke-move-one')
const pokeMoveTwo = document.querySelector('.poke-move-two')
const pokeMoveThree = document.querySelector('.poke-move-three')
const pokeMoveFour = document.querySelector('.poke-move-four')
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const searchButton = document.querySelector('search-button');

//variables

let prevURL = null;
let nextURl = null;



// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    mainScreen.classList.remove('hide');
    const classListLength = mainScreen.classList.length;
    for (let i = 0; i < classListLength; i++) {
        mainScreen.classList.remove(mainScreen.classList[0]);
    }
    mainScreen.classList.add("main-screen");
};


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeSearch");
    let pokeSearch = pokeNameInput.value;
    pokeSearch = pokeSearch.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            resetScreen();
            dataFirstType = 'Normal';
            pokeSprite.src = "";
            poke3DImage.src = "";
            pokeTypeOne.textContent = "error";
            pokeTypeTwo.textContent = "error";
            pokeName.textContent = "Write a Valid Name";
            pokeId.textContent = '#' + data.id.toString().padStart(3, '0');
            pokeWeight.textContent = 0;
            pokeHeight.textContent = 0;
            pokeMoveOne.textContent = "";
            pokeMoveTwo.textContent = "";
            pokeMoveThree.textContent = "";
            pokeMoveFour.textContent = "";


            console.log(res);

        }
        else {
            return res.json();
        }
    }).then(data => {
        resetScreen();
  
        const dataTypes = data.types;
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataFirstType.type.name);
        if (dataSecondType) {
          pokeTypeTwo.classList.remove('hide');
          pokeTypeTwo.textContent = capitalize(dataSecondType.type.name);
        } else {
          pokeTypeTwo.classList.add('hide');
          pokeTypeTwo.textContent = '';
        }
        mainScreen.classList.add(dataFirstType.type.name);
  
        const pokeMovesetOne = data.moves[0]
        const pokeMovesetTwo = data.moves[1]
        const pokeMovesetThree = data.moves[2]
        const pokeMovesetFour = data.moves[3]
  
  
  
        pokeName.textContent = capitalize(data.name);
        pokeId.textContent = '#' + data.id.toString().padStart(3, '0');
        pokeWeight.textContent = data.weight;
        pokeHeight.textContent = data.height;
        pokeMoveOne.textContent = capitalize(pokeMovesetOne.move.name);
        pokeMoveTwo.textContent = capitalize(pokeMovesetTwo.move.name);
        pokeMoveThree.textContent = capitalize(pokeMovesetThree.move.name);
        pokeMoveFour.textContent = capitalize(pokeMovesetFour.move.name);
        pokeSprite.src = data.sprites.front_default || '';
        poke3DImage.src = data.sprites.other.home.front_default || '';
    });
}

const fetchPokeList = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { results, previous, next } = data;
      prevUrl = previous;
      nextUrl = next;

      for (let i = 0; i < pokeListItems.length ; i++) {
        const pokeListItem = pokeListItems[i];
        const resultData = results[i];

        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split('/');
          const id = urlArray[urlArray.length - 2];
          pokeListItem.textContent = id + '. ' + capitalize(name);
        } else {
          pokeListItem.textContent = '';
        }
      }
    });
};

const fetchPokeData = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
      resetScreen();

      const dataTypes = data.types;
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = capitalize(dataFirstType.type.name);
      if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = capitalize(dataSecondType.type.name);
      } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
      }
      mainScreen.classList.add(dataFirstType.type.name);

      const pokeMovesetOne = data.moves[0]
      const pokeMovesetTwo = data.moves[1]
      const pokeMovesetThree = data.moves[2]
      const pokeMovesetFour = data.moves[3]



      pokeName.textContent = capitalize(data.name);
      pokeId.textContent = '#' + data.id.toString().padStart(3, '0');
      pokeWeight.textContent = data.weight;
      pokeHeight.textContent = data.height;
      pokeMoveOne.textContent = capitalize(pokeMovesetOne.move.name);
      pokeMoveTwo.textContent = capitalize(pokeMovesetTwo.move.name);
      pokeMoveThree.textContent = capitalize(pokeMovesetThree.move.name);
      pokeMoveFour.textContent = capitalize(pokeMovesetFour.move.name);
      pokeSprite.src = data.sprites.front_default || '';
      poke3DImage.src = data.sprites.other.home.front_default || '';
    });
};



const handleLeftButtonClick = () => {
  if (prevUrl) {
    fetchPokeList(prevUrl);
  }
};

const handleRightButtonClick = () => {
  if (nextUrl) {
    fetchPokeList(nextUrl);
  }
};

const handleSearchButtonClick = () => {
    if (url) {
        fetchPokemon(pokeSearch)
    }
}



const handleListItemClick = (e) => {
  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;

  const id = listItem.textContent.split('.')[0];
  fetchPokeData(id);
};


// adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {
  pokeListItem.addEventListener('click', handleListItemClick);
}




// initialize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');