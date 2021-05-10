import './assets/css/app.css'

// Global variables
const gridContainer = document.querySelector('#grid');
let button = document.querySelector('#btn');
let formWrapper = document.querySelector('#dino-compare');
let inputFields = [...document.querySelectorAll('input')];

// Create Dino Constructor
// Source for this approach: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
function DinoData(species, weight, height, diet, where, when, fact, image) {
  this.species = species;                                                // Must show in the grid
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;                                                      // Must show in the grid
  this.image = require(`./assets/images/${species.toLowerCase()}.png`);  // Must show in the grid. Using 'require' for webpack to build the images
}

// Create Dino Objects
let dino = [];

// Source for this approach: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
const dino_data = require('./dino.json')
const dino_object = dino_data.dinos;
dino = dino_object.map(dinoData => {
  return new DinoData(
      dinoData.species,
      dinoData.weight,
      dinoData.height,
      dinoData.diet,
      dinoData.where,
      dinoData.when,
      dinoData.fact,
      dinoData.image
  )
});

// Create Human Constructor
// Source: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
function HumanData(name, height, weight, diet, image) {
  this.name = name;                         // Must show in the grid
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = './assets/images/human.png'; // Must show in the grid
}

// Create Human Object
let human = null;

function HumanObject() {
  const humanName = document.getElementById('name').value;
// Source for converting values to numbers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  const humanFeet = Number(document.getElementById('feet').value);
  const humanInches = Number(document.getElementById('inches').value);
// Source for calculating to 1 height: https://www.thecalculatorsite.com/conversions/length/feet-to-inches.php#:~:text=There%20are%2012%20inches%20in,(or%20divide%20by%200.083333333333333)%20.
  const humanHeight = humanFeet * 12 + humanInches;
  const humanWeight = Number(document.getElementById('weight').value);
  const humanDiet = document.getElementById('diet').value.toLowerCase();

  return new HumanData(humanName, humanHeight, humanWeight, humanDiet);
}

// Validate input fields
// Source: https://www.semicolonworld.com/question/68321/how-to-disable-a-button-if-one-of-the-inputs-is-empty-pure-javascript
function validateInput() {
  button.disabled = inputFields.some(input => !input.value);
}

formWrapper.addEventListener('input', validateInput);
validateInput();

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoData.prototype.compareHeight = () => {
  this.height > human.height
      ? console.log(`${this.species} is bigger than ${human.name}`)
      : console.log(`${this.species} is smaller than ${human.name}`)
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoData.prototype.compareWeight = (humanWeight, humanName) => {
  this.weight > humanWeight
      ? console.log(`${this.species} is heaver than ${humanName}`)
      : console.log(`${this.species} is lighter than ${humanName}`)
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoData.prototype.compareDiet = (humanDiet, humanName) => {
  this.diet !== humanDiet
      ? console.log(`${this.species} eats a lota ${this.diet} while ${humanName} prefers ${this.species} burgers.`)
      : console.log(`${this.species} and ${humanName} both prefer ${this.diet}`)
}

// Switch case
const getRandomFact = (dino) => {
  let fact;
  const randomFact = dino.species !== 'Pigeon'
      ? Math.floor(Math.random() * 2)
      : `${dino.fact}`
  switch (randomFact) {
    case 0:
      fact = `${dino.species} are full of themselves.`
      break;
    case 1:
      fact = `${dino.species} was living the dream in ${dino.where}`
      break;
    case 2:
      fact = `The ${dino.species} was roaming the planet around the ${dino.when}`
      break;
    default:
      fact = `${dino.fact}`
  }
  return fact;
}

// Generate Tiles
const generateTiles = () => {
  // Remove form
  document.getElementById('dino-compare').remove();

  // iterate over dino data
  dino.forEach((dinoData, index) => {
    let fact = getRandomFact(dinoData)
    // For facts we don't pull data from dinoData because we are getting it from getRandomFact
    generateDinoTiles(dinoData.species, dinoData.image, fact)

    // Place human tile in the center
    if (index === 3) {
      generateHumanTiles(human.name, human.image)
    }
    console.log(dino[index])
  })
}

// Add tiles to DOM
const generateDinoTiles = (species, image, fact) => {
  const gridItem = document.createElement('div');
  gridItem.className += 'grid-item';
  gridContainer.appendChild(gridItem);

  const dinoSpecies = document.createElement('h3');
  dinoSpecies.innerText = species
  gridItem.appendChild(dinoSpecies);

  const dinoImage = document.createElement('img');
  dinoImage.src = `./assets/images/${species.toLowerCase()}.png`
  gridItem.appendChild(dinoImage);

  const facts = document.createElement('p');
  facts.innerText = fact;
  gridItem.appendChild(facts);
}

const generateHumanTiles = (name, image) => {
  const gridItem = document.createElement('div');
  gridItem.className += 'grid-item';
  gridContainer.appendChild(gridItem);

  const humanName = document.createElement('h3');
  humanName.innerText = name
  gridItem.appendChild(humanName);

  const dinoImage = document.createElement('img');
  dinoImage.src = image
  gridItem.appendChild(dinoImage);
}

// On button click, prepare and display infographic
const submitButton = () => {
  document.querySelector('button').addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        // Get Human object
        human = HumanObject()
        console.log(human)

        // Remove form from the DOM and add Grid
        generateTiles();
      })
}

submitButton();
