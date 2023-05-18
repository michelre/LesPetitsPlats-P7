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

    createListOptions(){
        const elements = document.createElement('ul')
        elements.classList.add('listbox-options')
        this.filteredData.forEach(element => {
            const li = document.createElement('li')
            li.innerText = element
            elements.appendChild(li)

            li.addEventListener('click', () => {
                this.onClickElement(element)
                console.log(element, this.type)
            })
        })
        console.log(elements)
        return elements
    }

    render(){
        const divSelect = document.createElement('div')
        const button = document.createElement('button')
        const input = document.createElement('input')
        const spanName = document.createElement('span')
        spanName.innerText = this.name
        input.classList.add('listbox-input')
        input.setAttribute('placeholder', this.placeholder)
        button.classList.add('listbox-button')
        //button.classList.add('tri-ingredients')
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
        //<i class="fa fa-solid fa-chevron-down"></i>`

        let elements = this.createListOptions()

/* --- TEST : AFFICHAGE DE LA LISTE D'OPTIONS AU CLIC BTN --- */
        //const input = document.querySelector('.listbox-input');

        chevron.addEventListener('click', () => {
            if(this.isOpened){
                elements.style.display = "none";
                input.style.display = "none";
                spanName.style.display = 'block'
                chevron.classList.remove('opened')
            } else {
                elements.style.display = "block";
                input.style.display = "block";
                spanName.style.display = 'none'
                chevron.classList.add('opened')
            }
            this.isOpened = !this.isOpened
        })

        input.addEventListener('input', (e) => {
            this.filteredData = this.data.filter(elt => elt.includes(e.target.value.toLowerCase()))
            elements.remove()
            elements = this.createListOptions()
            divSelect.appendChild(elements)
            elements.style.display = "block";
            //console.log(this.filteredData)
        })

        divSelect.appendChild(button)
        divSelect.appendChild(elements)

        return divSelect
    }
}

export default Select