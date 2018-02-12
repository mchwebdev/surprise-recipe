// Global variables
let database;
let titleItem = [];

window.onload = function () {
  // Scrolls to the top when page is loaded
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 1);

  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCG_wP87yeVbxswW-e9RNYdIvSnYgztXQQ',
    authDomain: 'surprise-recipe.firebaseapp.com',
    databaseURL: 'https://surprise-recipe.firebaseio.com',
    projectId: 'surprise-recipe',
    storageBucket: 'surprise-recipe.appspot.com',
    messagingSenderId: '123716764125',
  };
  firebase.initializeApp(config);

  // Create a “database” instance from the firebase object
  database = firebase.database();

  // Create a path (= firebase ref) to 'smoothieLists'
  const ref = database.ref('smoothieLists');

  // Create asynchronous listener to retrieve data from database
  ref.once('value', getRecipe);
};

// Calls the getRecipe function to create display recipe when submitBtn is clicked
document.getElementById('submitBtn').addEventListener("click", function () {
  const ref = database.ref('smoothieLists');
  ref.once('value', getRecipe);
});

// Calls the getRecipe function to create display recipe when submitBtnBottom is clicked
document.getElementById('submitBtnBottom').addEventListener("click", function () {
  const ref = database.ref('smoothieLists');
  ref.once('value', getRecipe);
});

// Function to retrieve lists, push  one random item from each list and print
// the result in the html calling the printRecipe function.
function getRecipe(data) {
  titleItem = [];
  const smoothieLists = data.val();

  // To retrieve IDs of lists with path smoothieLists of the firebase database
  const keys = Object.keys(smoothieLists);

  // Loop to iterate through each key (ID)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // Look at each object and store it in an array called listOfNames.
    // (Value changing at each loop)
    const listsOfNames = smoothieLists[key].name;

    // Pushes the item to the titleItem array after listOfNames has gone
    // through the pickRandomItem function to randomly pick one item from the array
    titleItem.push(pickRandomItem(listsOfNames));

    // Calling printRecipe function to print the recipe
    printRecipe();
  }
}

function pickRandomItem(myArray) {
  const randomItem = myArray[Math.floor(Math.random() * myArray.length)];
  return randomItem;
}

function printRecipe() {
  const recipeContent = document.getElementById('recipeContent');
  recipeContent.innerHTML =
  `<b>The<br>
  ${titleItem[0]} ${titleItem[1]}'s<br>
  smoothie</b><br>
  <hr>
  ${titleItem[2]}<br>
  ${titleItem[3]}<br>
  ${titleItem[4]}<br>
  ${titleItem[5]}<br>
  ${titleItem[6]}`;
}
