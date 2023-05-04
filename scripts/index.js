/* REMI: Ajout des variables globales tout en haut pour faciliter le futur algo de recherche */
// Déclaration des variables
let recipes = []

// Récupération des différentes recettes via un fetch
async function getRecipes() {
    const res = await fetch("../data/recipes.json")
    return await res.json()
}

async function init() {
    /* REMI: On peut stocker les recettes dans la variable globale prévue à cet effet */
    recipes = await getRecipes();
    /* REMI: Vu que recipes est une variable globale, pas besoin de la passer en paramètre à la fonction */
    displayRecipes();
    console.log(recipes);
};
init();

// Déclaration des constantes
/* REMI: Duplication de la variable recipeSection non nécessaire ici de manière globale */
//const recipeSection = document.getElementById('cards-container');

// TEST - Affichage des Cards recette via la factory recipeFactory
function displayRecipes() {
    const recipeSection = document.getElementById('cards-container');
    recipeSection.innerHTML = ''

    recipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    })
}


/* REMI: Conseils:
* 1. Faire un composant "Select" qui prend en paramètre les éléments (ingrédients / ustensils / appareils) à afficher
* 2. Afficher les ingrédients / ustensils et appareils dans chacun des selects
* 3. Rassembler les évènements dans une méthode propre à ce composant
*   - Comme ci-dessous, au click sur le composant, l'ouvrir ou le fermer pour afficher ou cacher le contenu
*   - Au click sur un élément de la liste remonter l'information de l'élément cliqué (on verra ça ensemble, c'est le plus chiant)
*  */


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