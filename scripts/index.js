import Select from './factories/Select.js'

// Déclaration des variables globales 
let recipes = []
let selectedIngredients = []
let selectedAppliances = []
let selectedUstensiles = []
const selects = []

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
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search()

            // Evènement filtrant les options de la liste déroulante en fonction de la saisie de l'input
            listElement.addEventListener('click', () => {
                selectedIngredients = selectedIngredients
                    .filter(selectedIngredient => selectedIngredient !== ingredient)
                listElement.remove()
                search()
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'ingredient') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
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
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search()

            // Evènement filtrant les options de la liste déroulante en fonction de la saisie de l'input
            listElement.addEventListener('click', () => {
                selectedAppliances = selectedAppliances
                    .filter(selectedAppliance => selectedAppliance !== appliance)
                listElement.remove()
                search()
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'appareil') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
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
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search()

            // Evènement filtrant les options de la liste déroulante en fonction de la saisie de l'input
            listElement.addEventListener('click', () => {
                selectedUstensiles = selectedUstensiles
                    .filter(selectedUstensil => selectedUstensil !== ustensil)
                listElement.remove()
                search()
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'ustensil') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
    const triIngredients = document.querySelector('.tri-ustensiles')
    triIngredients.appendChild(select.render())
}


/* Algorithme de filtrage des recettes (boucle for) - Input principal - Titre et description */
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
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Étape 4 : Comparer le titre et la description avec l'entrée de recherche
        const recipeTitle = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        // Si le mot clé est inclus dans les ingrédients, ajouter la recette dans filteredRecipes
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


// Fonction générique prenant une recette en paramètre et effectuant une recherche basée sur une entrée de recherche
function searchByInput(recipe) {
    // Étape 1 : Récupérer l'entrée de recherche 
    const searchInput = searchBarInput.value;

    // Étape 2 : Convertir l'entrée de recherche en minuscules
    const searchTerm = searchInput.toLowerCase();

    // Convertir le titre de la recette et la description de la recette en minuscules
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();

    // Si le mot clé est inclus dans le titre ou la description de la recette, retourner true
    return recipeTitle.includes(searchTerm) || recipeDescription.includes(searchTerm)
}

// Algorithme de recherche spécifique à l'input de la listbox Ingrédients
function searchByIngredients(recipe) {
    return recipe.ingredients
        // Filtrer les ingrédients de la recette en fonction des ingrédients sélectionnés
        .filter(ingredient => selectedIngredients.includes(ingredient.ingredient.toLowerCase()))
        // Vérifier si le nombre d'ingrédients filtrés est égal au nombre total d'ingrédients sélectionnés
        .length === selectedIngredients.length;
}

// Algorithme de recherche spécifique à l'input de la listbox Appareils
function searchByAppliances(recipe) {
    return selectedAppliances
        // Filtrer l'appareil contenu dans la recette en fonction de l'appareil sélectionné  
        .filter(appliance => appliance === recipe.appliance.toLowerCase())
        // Vérifier si le nombre d'appareils filtrés est égal au nombre total d'appareils sélectionnés
        .length === selectedAppliances.length;
}

// Algorithme de recherche spécifique à l'input de la listbox Ustensiles
function searchByUstensils(recipe) {
    return recipe.ustensils
        // Filtrer les ustensiles sélectionnés en fonction des ustensiles de la recette 
        .filter(ustensil => selectedUstensiles.includes(ustensil.toLowerCase()))
        // Vérifier si le nombre d'ustensiles filtrés est égal au nombre total d'ustensiles sélectionnés
        .length === selectedUstensiles.length;
}

// Méthode 1 - FILTER : Fonction effectuant une recherche globale sur les recettes en fonction des critères de recherche
function search() {
    // Filtrer les recettes en utilisant les fonctions de recherche spécifiques
    const filteredRecipes = recipes.filter((recipe) => {
        return searchByIngredients(recipe) &&
            searchByAppliances(recipe) &&
            searchByUstensils(recipe) &&
            searchByInput(recipe);
    });

    // Récupérer l'élément HTML représentant la section des cartes de recettes
    const recipeSection = document.getElementById('cards-container');

    // Vider le contenu précédent de la section des cartes de recettes
    recipeSection.innerHTML = '';

    // Pour chaque recette filtrée, générer une carte de recette et l'ajouter à la section des cartes de recettes
    filteredRecipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    });
}

/*
// Méthode 2 - BOUCLE FOR : Fonction effectuant une recherche globale sur les recettes en fonction des critères de recherche
function search() {
    let filteredRecipes = [];
    // Parcourir toutes les recettes
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Vérifier si la recette satisfait tous les critères de recherche
        if (
            searchByIngredients(recipe) &&
            searchByAppliances(recipe) &&
            searchByUstensils(recipe) &&
            searchByInput(recipe)
        ) {
            // Ajouter la recette filtrée au tableau des recettes filtrées
            filteredRecipes.push(recipe);
        }
    }

    // Récupérer l'élément HTML représentant la section des cartes de recettes
    const recipeSection = document.getElementById('cards-container');

    // Vider le contenu précédent de la section des cartes de recettes
    recipeSection.innerHTML = '';

    // Pour chaque recette filtrée, générer une carte de recette et l'ajouter à la section des cartes de recettes
    filteredRecipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    });
}
*/


/*
Conclusion des tests algorithmiques 
Filter est plus lisible (on in crémente pas sur des boucles)
Le for est plus rapide 
*/