import Select from './factories/Select.js'

// Déclaration des variables globales 
let recipes = []
let selectedIngredients = []
let selectedAppliances = []
let selectedUstensiles = []

const tags = document.querySelector('.tags')

// Récupération des différentes recettes via un fetch
async function getRecipes() {
    const res = await fetch("../data/recipes.json")
    return await res.json()
}

async function init() {
    /* REMI: On peut stocker les recettes dans la variable globale prévue à cet effet */
    recipes = await getRecipes();
    displayRecipes();
    displayIngredientsSelect()
    displayAppliancesSelect()
    displayUstensilsSelect()
};
init();


// Affichage des Cards recette via la factory recipeFactory
function displayRecipes() {
    const recipeSection = document.getElementById('cards-container');
    recipeSection.innerHTML = ''

    recipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    })
}

// Listbox : Récupération et création de la liste d'ingrédients 
function displayIngredientsSelect() {
    const ingredients = recipes
        .map(recipe =>
            recipe.ingredients
                .map(ingredient => ingredient.ingredient)
        ).flat()
    const select = new Select(
        ingredients,
        'ingredient',
        'Ingrédient',
        'Recherchez vos ingrédients',
        (ingredient) => {
            selectedIngredients.push(ingredient)
            const listElement = document.createElement('li')
            listElement.innerText = ingredient
            tags.appendChild(listElement)
            console.log(selectedIngredients)

            listElement.addEventListener('click', () => {
                selectedIngredients = selectedIngredients
                    .filter(selectedIngredient => selectedIngredient !== ingredient)
                listElement.remove()
            })
        }
    )
    const triIngredients = document.querySelector('.tri-ingredients')
    triIngredients.appendChild(select.render())
}

// Listbox : Récupération et création de la liste d'appareils
function displayAppliancesSelect() {
    const appliances = recipes.map(recipe => recipe.appliance)
    const select = new Select(
        appliances,
        'appareil',
        'Appareils',
        'Recherchez vos appareils',
        (appliance) => {
            selectedAppliances.push(appliance)
            const listElement = document.createElement('li')
            listElement.innerText = appliance
            tags.appendChild(listElement)
            console.log(selectedAppliances)

            listElement.addEventListener('click', () => {
                selectedAppliances = selectedAppliances
                    .filter(selectedAppliance => selectedAppliance !== appliance)
                listElement.remove()
            })
        }
    )
    const triIngredients = document.querySelector('.tri-appareils')
    triIngredients.appendChild(select.render())
}

// Listbox : Récupération et création de la liste d'ustensiles 
function displayUstensilsSelect() {
    const ustensils = recipes
        .map(recipe => recipe.ustensils)
        .flat()
    const select = new Select(
        ustensils,
        'ustensil',
        'Ustensiles',
        'Recherchez vos ustensiles',
        (ustensil) => {
            selectedUstensiles.push(ustensil)
            const listElement = document.createElement('li')
            listElement.innerText = ustensil
            tags.appendChild(listElement)
            console.log(selectedUstensiles)

            listElement.addEventListener('click', () => {
                selectedUstensiles = selectedUstensiles
                    .filter(selectedUstensil => selectedUstensil !== ustensil)
                listElement.remove()
            })
        }
    )
    const triIngredients = document.querySelector('.tri-ustensiles')
    triIngredients.appendChild(select.render())
}

/* REMI: Conseils:
* 1. Faire un composant "Select" qui prend en paramètre les éléments (ingrédients / ustensils / appareils) à afficher
* 2. Afficher les ingrédients / ustensils et appareils dans chacun des selects
* 3. Rassembler les évènements dans une méthode propre à ce composant
*   - Comme ci-dessous, au click sur le composant, l'ouvrir ou le fermer pour afficher ou cacher le contenu
*   - Au click sur un élément de la liste remonter l'information de l'élément cliqué (on verra ça ensemble, c'est le plus chiant)
*  */


/*
// TEST - ANIMATION AU CLIC LISTBOXS

// Récupère l'élément du bouton
var bouton = document.querySelector('.tri-ingredients button');

// Ajoute un écouteur d'événement pour détecter le clic sur le bouton
bouton.addEventListener('click', function () {

// Récupère l'élément de la div parente du bouton
    var divParente = bouton.parentNode;

// Ajoute une classe à la div parente pour agrandir sa largeur et afficher l'input de recherche
    divParente.classList.toggle('ouvert');

});
*/

/*
// Récupère l'élément du bouton
const optionsBtn = document.querySelector('.listbox-button');
const ulElement = document.querySelector('.listbox-options');

// Ajoute un écouteur d'événement pour détecter le clic sur le bouton
optionsBtn.addEventListener('click', () => {
    ulElement.style.overflow = "visible";
});
*/