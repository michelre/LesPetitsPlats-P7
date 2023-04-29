// Récupération des différentes recettes via un fetch 
async function getRecipes() {
    const res = await fetch("../data/recipes.json")
    return await res.json()
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
    console.log(recipes);
};
init();

// Déclaration des variables
let recipes = []

// Déclaration des constantes
const recipeSection = document.getElementById('cards-container');

// TEST - Affichage des Cards recette via la factory recipeFactory
function displayRecipes(recipes) {
    const recipeSection = document.getElementById('cards-container');
    recipeSection.innerHTML = ''

    recipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    })
}



/* TEST - Affichage des Cards recette
async function displayData(recipes) {
    const const cardsContainer = document.querySelector(".cards-container")

    recipes.
}
*/