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



// TEST - ANIMATION AU CLIC LISTBOXS

// Récupère l'élément du bouton
var bouton = document.querySelector('.tri-ingredients button');

// Ajoute un écouteur d'événement pour détecter le clic sur le bouton
bouton.addEventListener('click', function() {

// Récupère l'élément de la div parente du bouton
var divParente = bouton.parentNode;

// Ajoute une classe à la div parente pour agrandir sa largeur et afficher l'input de recherche
divParente.classList.toggle('ouvert');

});