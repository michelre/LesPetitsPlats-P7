// Class générant les fonctionnalités de filtrage des listboxs 
class Select {
    constructor(data, type, name, placeholder, onClickElement, onOpened) {
        this.data = data
        this.filteredData = data
        this.type = type
        this.name = name
        this.placeholder = placeholder
        this.onClickElement = onClickElement
        this.onOpened = onOpened;
        this.isOpened = false
    }

    // Méthode créant la liste d'options déroulante des listboxs
    createListOptions() {
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

    close() {
        this.elements.style.display = "none";
        this.input.style.display = "none";
        this.spanName.style.display = 'block'
        this.chevron.classList.remove('opened')
        this.isOpened = false
    }

    open() {
        this.elements.style.display = "flex";
        this.input.style.display = "block";
        this.spanName.style.display = 'none'
        this.chevron.classList.add('opened')
        //divSelect.style.width = '100%'; // Retour à la taille d'origine de la div
        this.elements.classList.add('active')
        this.isOpened = true
    }

    // Création du DOM Listbox
    render() {
        const divSelect = document.createElement('div')
        const button = document.createElement('button')
        this.input = document.createElement('input')
        this.spanName = document.createElement('span')
        this.spanName.innerText = this.name
        divSelect.classList.add('listbox-div')
        this.input.classList.add('listbox-input')
        this.input.setAttribute('placeholder', this.placeholder)
        button.classList.add('listbox-button')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')

        const divButton = document.createElement('div')
        divButton.appendChild(this.spanName)
        divButton.appendChild(this.input)
        button.appendChild(divButton)

        this.chevron = document.createElement('i')
        this.chevron.classList.add("fa", "fa-solid", "fa-chevron-down")
        button.appendChild(this.chevron)

        this.elements = this.createListOptions()

        // Fonction gérant le comportement d'ouverture et de fermeture de la liste déroulante d'options
        this.chevron.addEventListener('click', () => {
            if (this.isOpened) {
                this.close()
                //divSelect.style.width = '200%'; // Agrandissement de la div
            } else {
                this.open()
            }
            this.onOpened()
        })

        // Fonction réagissant à la saisie de l'input de recherche en filtrant les options en fonction du texte saisi tout en mettant à jour la liste déroulante
        this.input.addEventListener('input', (e) => {
            this.filteredData = this.data.filter(elt => elt.includes(e.target.value.toLowerCase()))
            this.elements.remove()
            this.elements = this.createListOptions()
            divSelect.appendChild(this.elements)
            this.elements.style.display = "block";
        })

        divSelect.appendChild(button)
        divSelect.appendChild(this.elements)

        return divSelect
    }
}

export default Select