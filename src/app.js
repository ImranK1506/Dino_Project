import './assets/css/app.css'

// Global variables
let button = document.querySelector('#btn');
let formWrapper = document.querySelector('#dino-compare');
let inputFields = [...document.querySelectorAll('input')];

// Create Dino Constructor
// Source for this approach: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
function DinoData(species, weight, height, diet, where, when, fact, image) {
  this.species = species;     // Must show in the grid
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;           // Must show in the grid
  this.image = require(`./assets/images/${species.toLowerCase()}.png`);
}

// Create Dino Objects
// Source for this approach: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
let dino = [];
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
// dino.forEach((value, key) => {
//   console.log(value, key)
// })

// Create Human Constructor
// Source: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
function HumanData(name, height, weight, diet, image) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = './assets/images/human.png';
}

// Create Human Object
function HumanObject() {
  const humanName = document.getElementById('name').value;
// Source for converting values to numbers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  const humanFeet = Number(document.getElementById('feet').value);
  const humanInches = Number(document.getElementById('inches').value);
// Source for calculating to 1 height: https://www.thecalculatorsite.com/conversions/length/feet-to-inches.php#:~:text=There%20are%2012%20inches%20in,(or%20divide%20by%200.083333333333333)%20.
  const humanHeight = humanFeet * 12 + humanInches;
  const humanWeight = Number(document.getElementById('weight').value);
  const humanDiet = document.getElementById('diet').value.toLowerCase();
  const humanImage = './assets/images/human.png';

  return new HumanData(humanName, humanHeight, humanWeight, humanDiet, humanImage);
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

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareWeight = () => {

}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = () => {

}

// Get Random fact
const randomFact = () => {

}

// Generate Tiles for each Dino in Array
const generateTiles = () => {
  // iterate over dino data and retrieve it's value
  for (let dino of dino_object.values()) {
    // Append grid item to parent grid
    const gridContainer = document.querySelector('#grid');

    // Source: https://www.javascripttutorial.net/javascript-dom/javascript-appendchild/
    // Create grid items
    const gridItem = document.createElement('div');
    gridItem.className += 'grid-item';
    gridContainer.appendChild(gridItem);

    const speciesOrName = document.createElement('h3');
    speciesOrName.innerText = dino.species;
    gridItem.appendChild(speciesOrName);

    const image = document.createElement('img');
    image.src = `./assets/images/${dino.species.toLowerCase()}.png`;
    gridItem.appendChild(image);

    const facts = document.createElement('p');
    facts.innerText = dino.fact;
    gridItem.appendChild(facts);
  }

  document.getElementById('dino-compare').remove();
}

// Add tiles to DOM
// const addTiles = () => {
//   // Remove form
//   document.getElementById('dino-compare').remove();
//   // Add grid
//   generateTiles();
// }

// On button click, prepare and display infographic
const submitButton = () => {
  document.querySelector('button').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        // Log dino data
        console.log(dino)

        // Get Human object
        HumanObject()
        console.log(HumanObject())

        // Remove form from the DOM and add Grid
        generateTiles();
      })
}

submitButton();