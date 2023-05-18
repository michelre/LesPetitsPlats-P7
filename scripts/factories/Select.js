class Select {
    constructor(data, type, name, placeholder, onClickElement) {
        this.data = data
        this.type = type
        this.name = name
        this.placeholder = placeholder
        this.onClickElement = onClickElement
    } 

    render(){
        const divSelect = document.createElement('div')
        const button = document.createElement('button')
        button.classList.add('listbox-button')
        //button.classList.add('tri-ingredients')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')
        button.innerHTML = `<div>
            <span>${this.name}</span>
            <input type="text" placeholder="${this.placeholder}" class="listbox-input">
        </div>
        <i class="fa fa-solid fa-chevron-down"></i>`

        const elements = document.createElement('ul')
        elements.classList.add('listbox-options')
        this.data.forEach(element => {
            const li = document.createElement('li')
            li.innerText = element
            elements.appendChild(li)

            li.addEventListener('click', () => {
                this.onClickElement(element)
                console.log(element, this.type)
            })
        })

/* --- TEST : AFFICHAGE DE LA LISTE D'OPTIONS AU CLIC BTN --- */
        const input = document.querySelector('.listbox-input');

        button.addEventListener('click', () => {
            console.log(this.type)
            elements.style.display = "block";
            input.style.display = "block";
        })

        divSelect.appendChild(button)
        divSelect.appendChild(elements)

        return divSelect
    }
}

export default Select