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
        //button.classList.add('tri-ingredients')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')
        button.innerHTML = `<div>
            <span>${this.name}</span>
            <input type="text" placeholder="${this.placeholder}">
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
        //elements.append(nodeElements)




        button.addEventListener('click', () => {
            console.log(this.type)
        })

        divSelect.appendChild(button)
        divSelect.appendChild(elements)

        return divSelect
    }
}

export default Select