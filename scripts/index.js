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
                .map(ingredient => ingredient.ingredient.toLowerCase())
        ).flat()
    const select = new Select(
        Array.from(new Set(ingredients)),
        'ingredient',
        'Ingrédient',
        'Recherchez vos ingrédients',
        (ingredient) => {
            selectedIngredients.push(ingredient)
            const listElement = document.createElement('li')
            listElement.innerText = ingredient
            listElement.style.background = "#3282F7"

            /* TEST AJOUT ICONE CROIX FEMETURE TAG - !!!!!!!!  NON FONCTIONNEL !!!!!!!!! */
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa-regular", "fa-circle-xmark")
            listElement.appendChild(listElementClose)

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
    const appliances = recipes.map(recipe => recipe.appliance.toLowerCase())
    const select = new Select(
        Array.from(new Set(appliances)),
        'appareil',
        'Appareils',
        'Recherchez vos appareils',
        (appliance) => {
            selectedAppliances.push(appliance)
            const listElement = document.createElement('li')
            listElement.innerText = appliance
            listElement.style.background = "#68D9A4"
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
        .map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
        .flat()
    const select = new Select(
        Array.from(new Set(ustensils)),
        'ustensil',
        'Ustensiles',
        'Recherchez vos ustensiles',
        (ustensil) => {
            selectedUstensiles.push(ustensil)
            const listElement = document.createElement('li')
            listElement.innerText = ustensil
            listElement.style.background = "#ED6454"
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




/* TEST ALGORITHME DE RECHERCHE INPUT PRINCIPALE : TITRE + DESCRIPTION RECETTE */

// Sélection de l'élément input et ajout d'un gestionnaire d'événement de saisie
const searchBarInput = document.getElementById('searchBar-input');
searchBarInput.addEventListener('input', performSearch);

// Fonction de recherche
function performSearch() {
  // Étape 1 : Récupérer l'entrée de recherche
  const searchInput = searchBarInput.value;

  // Étape 2 : Convertir l'entrée de recherche en minuscules
  const searchTerm = searchInput.toLowerCase();

  // Étape 3 : Parcourir les recettes
  var filteredRecipes = [];
  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i];

    // Étape 4 : Comparer le titre et la description avec l'entrée de recherche
    var recipeTitle = recipe.name.toLowerCase();
    var recipeDescription = recipe.description.toLowerCase();
    if (recipeTitle.includes(searchTerm) || recipeDescription.includes(searchTerm)) {
      // Étape 5 : Ajouter la recette à la liste de résultats
      filteredRecipes.push(recipe);
    }
  }

  // Étape 6 : Afficher les recettes correspondantes
  const recipeSection = document.getElementById('cards-container');
  recipeSection.innerHTML = '';

  filteredRecipes.forEach((recipe) => {
    const recipeTemplate = recipeFactory(recipe);
    const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
    recipeSection.appendChild(recipeCardDOM);
  });
}



