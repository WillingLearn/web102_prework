/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';
console.log("this is games" + games)
console.log("this is games data" + GAMES_DATA)

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    // games.forEach( (i)=>document.getElementById("games-container").add(<div class="game-card"> This is {i.name} and it has {i.backers} backers <img src={i.img}></img> </div> ));
//     games.forEach((i) => {
//     const gameCard = document.createElement("div");
//     gameCard.className = "game-card";

//     // Use backticks for template literals
//     gameCard.innerHTML = `This is ${i.name} and it has ${i.backers} backers <img src="${i.img}" alt="${i.name} image"></img>`;

//     document.getElementById("games-container").appendChild(gameCard);
// });
    // const gameCard = document.createElement("div");
    // gameCard.className = "game-card";
    // gameCard.innerHTML = `This is ${i.name} and it has ${i.backers} backers <img src="${i.img}"/> `;
    // // gameCard.innerHTML = `This is ${i.name} and it has ${i.backers} backers <img src="${i.img}" ></img>`;    
    // document.getElementById("games-container").appendChild(gameCard);
    for (let j = 0; j < games.length; j++) {
        const gameCard = document.createElement("div");
        gameCard.className = "game-card";
        gameCard.innerHTML = 
        `This is ${games[j].name} and it has ${games[j].backers} backers <img class="game-img" src="${games[j].img}"/> <p>${games[j].description}  </p>` ;
        //
        // const image= document.createElement("img");
        // image.className= "game-img"
        // image.src=games[j].img;
        document.getElementById("games-container").appendChild(gameCard);
        
        

    }




    };


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
console.log(GAMES_JSON.length)
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
console.log(totalContributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} Contributions`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised")
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()} Raised`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length} Games Available`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    addGamesToPage(GAMES_JSON.filter((game)=>(game.pledged<game.goal)));
    

    // use filter() to get a list of games that have not yet met their goal



    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    addGamesToPage( GAMES_JSON.filter((game)=>(game.pledged>=game.goal)));
    


    // use the function we previously created to add unfunded games to the DOM
    // document.getElementById("games-container").innerHTML+"<div>filterFundedOnly</div>"

}
console.log(filterFundedOnly());
console.log(filterUnfundedOnly());

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded=(GAMES_JSON.filter((game)=>(game.pledged<game.goal))).length ;
console.log("num of unfunded is " + numUnfunded);
console.log(typeof numUnfunded);

// create a string that explains the number of unfunded games using the ternary operator
console.log(totalRaised)
const nuG= `There are ${numUnfunded>=0 ? numUnfunded:"an unknown number of"}`+` unfunded games and a total of $${totalRaised}` + ` raised.`;

// create a new DOM element containing the template string and append it to the description container
const nuG_div=document.createElement("p")
nuG_div.innerHTML=nuG
descriptionContainer.appendChild(nuG_div)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
console.log("name is", GAMES_JSON[0].name, "second name is", GAMES_JSON[1].name);
let [game1,game2] = [GAMES_JSON[0].name, GAMES_JSON[1].name] ;
console.log(game1, game2)
console.log("type is ",typeof(game1))
// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_pledge=document.createElement("h3");
top_pledge.innerHTML=game1
document.getElementById("first-game").appendChild(top_pledge)
// do the same for the runner up item
const runnerUp=document.createElement("h3");
runnerUp.innerHTML=game2;
document.getElementById("second-game").appendChild(runnerUp);
