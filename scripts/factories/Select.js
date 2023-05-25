// Class générant les fonctionnalités de filtrage des listboxs 
class Select {
    constructor(data, type, name, placeholder, onClickElement) {
        this.data = data
        this.filteredData = data
        this.type = type
        this.name = name
        this.placeholder = placeholder
        this.onClickElement = onClickElement
        this.isOpened = false
    }

    // Méthode créant la liste d'options déroulante des listboxs
    createListOptions(){
        const elements = document.createElement('ul')
        elements.classList.add('listbox-options')
        this.filteredData.forEach(element => {
            const li = document.createElement('li')
            li.innerText = element
            elements.appendChild(li)

            li.addEventListener('click', () => {
                this.onClickElement(element)
            })
        })
        return elements
    }

    // Création du DOM Listbox
    render(){
        const divSelect = document.createElement('div')
        const button = document.createElement('button')
        const input = document.createElement('input')
        const spanName = document.createElement('span')
        spanName.innerText = this.name
        divSelect.classList.add('listbox-div')
        input.classList.add('listbox-input')
        input.setAttribute('placeholder', this.placeholder)
        button.classList.add('listbox-button')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')

        const divButton = document.createElement('div')
        divButton.appendChild(spanName)
        divButton.appendChild(input)
        button.appendChild(divButton)

        const chevron = document.createElement('i')
        chevron.classList.add("fa", "fa-solid", "fa-chevron-down")
        button.appendChild(chevron)

        let elements = this.createListOptions()

        // Fonction gérant le comportement d'ouverture et de fermeture de la liste déroulante d'options
        chevron.addEventListener('click', () => {
            if(this.isOpened){
                elements.style.display = "none";
                input.style.display = "none";
                spanName.style.display = 'block'
                chevron.classList.remove('opened')
                //divSelect.style.width = '200%'; // Agrandissement de la div
            } else {
                elements.style.display = "grid";
                input.style.display = "block";
                spanName.style.display = 'none'
                chevron.classList.add('opened')
                //divSelect.style.width = '100%'; // Retour à la taille d'origine de la div
                elements.classList.add('active')
            }
            this.isOpened = !this.isOpened
        })

        // Fonction réagissant à la saisie de l'input de recherche en filtrant les options en fonction du texte saisi tout en mettant à jour la liste déroulante
        input.addEventListener('input', (e) => {
            this.filteredData = this.data.filter(elt => elt.includes(e.target.value.toLowerCase()))
            elements.remove()
            elements = this.createListOptions()
            divSelect.appendChild(elements)
            elements.style.display = "block";
        })

        divSelect.appendChild(button)
        divSelect.appendChild(elements)

        return divSelect
    }
}

export default Select