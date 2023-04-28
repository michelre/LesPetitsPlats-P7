// Fonction de création de la card recette comprenant toutes leurs informations
function recipesFactory(data) {
    const { name, ingredients, time, description, appliance, ustensils } = recipe

    // Création du DOM de la carte recette
    function getRecipesCardDOM() {
        const card = document.createElement('article');
        card.classList.add('card');

        const link = document.createElement('a');
        link.setAttribute('href', '#');
        card.appendChild(link);

        const img = document.createElement('div');
        img.classList.add('card-img');
        link.appendChild(img);

        const body = document.createElement('div');
        body.classList.add('card-body');
        link.appendChild(body);

        const header = document.createElement('div');
        header.classList.add('card-header');
        body.appendChild(header);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        header.appendChild(h2);

        const timing = document.createElement('span');
        timing.classList.add('card-time');
        header.appendChild(timing);

        const clock = document.createElement('img');
        clock.setAttribute("alt", 'Horloge');
        timing.appendChild(clock);

        const minutes = document.createElement('p');
        minutes.textContent = `${time} min`;
        timing.appendChild(minutes);

        const main = document.createElement('div');
        main.classList.add('card-main');
        body.appendChild(main);

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('card-ingredientsList');
        main.appendChild(ingredientsList);
    }
}