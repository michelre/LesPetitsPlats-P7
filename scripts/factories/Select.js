// Class générant les fonctionnalités de filtrage des listboxs 
class Select {
    constructor(data, type, name, placeholder, className, onClickElement, onOpened) {
        this.data = data
        this.filteredData = data
        this.type = type
        this.name = name
        this.placeholder = placeholder
        this.onClickElement = onClickElement
        this.onOpened = onOpened;
        this.isOpened = false
        this.className = className;
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

    // Gestion de la fermeture de la liste d'options déroulante des listboxs
    close() {
        this.elements.style.display = "none";
        this.input.style.display = "none";
        this.spanName.style.display = 'block'
        this.chevron.classList.remove('opened')
        this.isOpened = false
    }

    // Gestion de l'ouverture de la liste d'options déroulante des listboxs
    open() {
        this.elements.style.display = "flex";
        this.input.style.display = "block";
        this.spanName.style.display = 'none'
        this.chevron.classList.add('opened')
        this.elements.classList.add('active')
        this.isOpened = true
    }

    setData(data){
        this.data = data
        this.filteredData = data

        this.elements = this.createListOptions()

        const listboxOptions = document.querySelector(`.${this.className} .listbox-options`)
        listboxOptions.remove()

        const divSelect = document.querySelector(`.${this.className} .listbox-div`)
        divSelect.appendChild(this.elements)

        if(this.isOpened){
            this.open();
        }
    }

    // Création du DOM Listbox
    render() {
        // Conteneur principal Listbox
        const divSelect = document.createElement('div')
        divSelect.classList.add('listbox-div')
        // Bouton Listbox
        const button = document.createElement('button')
        button.classList.add('listbox-button')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')
        // Span affichant de nom de la Listbox
        this.spanName = document.createElement('span')
        this.spanName.innerText = this.name
        // Input de recherche 
        this.input = document.createElement('input')
        this.input.classList.add('listbox-input')
        this.input.setAttribute('placeholder', this.placeholder)
        // Div contenant le span (ingrédient/appareil/ustensile) et l'input de recherche
        const divButton = document.createElement('div')
        divButton.appendChild(this.spanName)
        divButton.appendChild(this.input)
        button.appendChild(divButton)
        // Icone d'ouverture/fermeture Listbox
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