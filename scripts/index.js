// Récupération des différentes recettes via un fetch 
async function getRecipes() {
    const res = await fetch("./data/recipes.json")
    return await res.json()
}

/* TEST - Affichage des Cards recette
async function displayData(recipes) {
    const const cardsContainer = document.querySelector(".cards-container")

    recipes.
}
*/

async function init() {
    const recipes = await getRecipes();
    console.log(recipes);
};
init();
