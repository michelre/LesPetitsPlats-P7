// Récupération des différentes recettes via un fetch 
async function getRecipes() {
    await fetch("./data/recipes.json")
            .then((res) => res.json())
            .then((data) => (recipes = data.recipes));
        return {
            recipes: [...recipes]
        };
}
console.log(getRecipes);

/*
async function init() {
    const { recipes } = await getRecipes();
};
init();
*/