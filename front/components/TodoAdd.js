import { urlBackAdd } from "../config.js";

class TodoAdd extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return /* css */`
            :host{
            
            }
            div.addrow {
                margin: 1rem 0;
                display: flex;
                justify-content: center;
                column-gap: 3rem;
            }
            div.addrow>input {
                max-width: 100%;
                width: 100%;
            }
            div.categories {
                display: flex;
                justify-content: center;
                column-gap:1rem;
            }
            div.categories div {
                display: inline-flex;
            }
            button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding:    5px 32px;
                text-align: center;
                text-decoration: none;
                font-size: 16px;
                cursor: pointer;
            }
        `;
    }

    static get template() {
        return /* html */`
            <div class="addrow">
                <input id="todoname" name="todoname" type="text" placeholder="New ToDo..." />
                <div class="categories">
                    <div>
                        <input type="checkbox" id="checkboxphp" name="checkboxphp" value="1">
                        <label for="checkboxphp">PHP</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkboxjavascript" name="checkboxjavascript" value="3">
                        <label for="checkboxphp">JavaScript</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkboxcss" name="checkboxcss" value="2">
                        <label for="checkboxphp">CSS</label>
                    </div>
                </div>
                <button action="add">AÑADIR</button>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
        this.addButton = this.shadowRoot.querySelector("button[action='add']");
        this.inputName = this.shadowRoot.querySelector("input#todoname");
        this.checkboxes = this.shadowRoot.querySelectorAll('input[type=checkbox]');
        this.categories = [];
        this.updateCheckboxes();
        Array.from(this.checkboxes).forEach(checkbox => {
            console.log("checkbox", checkbox);
            checkbox.addEventListener("change", () => this.updateCheckboxes());
        });
        console.log("categories", this.categories);
        this.addButton.addEventListener("click", () => this.addTodo());
    }

    updateCheckboxes() {
        const checkboxesSelected = this.shadowRoot.querySelectorAll("input[type=checkbox]:checked");
        console.log("checkboxes", this.checkboxes);
        console.log("checkboxesSelected", checkboxesSelected);
        this.categories = Array.from(checkboxesSelected, element => {
            return element.value;
        });
        console.log("this.categories", this.categories);
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${TodoAdd.styles}</style>
            ${TodoAdd.template}
        `;
    }

    addTodo() {
        const $inputname = this.shadowRoot.querySelector("input#todoname");
        const categories = this.categories;
        this.save($inputname.value, categories);
    }

    async save(todoname, categories) {
        const params = { todoname, categories };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Content-type": "text/plain"
        };
        const response = await fetch(urlBackAdd, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: new URLSearchParams(params).toString()
        });
        const data = await response.json();
        this.clearFields();
        const todoList = document.querySelector("todo-list");
        todoList.update();
        // return (!data.error) ? data.query : {};
    }

    prepareCategories(categories) {
        let returnCategories = ``;
        for (const categoryId in categories) {
            const categoryName = categories[categoryId];
            const categorySegment = /* html */`
                <span class="category" data-id="${categoryId}">${categoryName}</span>
            `;
            returnCategories += categorySegment;
        }
        return returnCategories;
    }

    clearFields(){
        this.inputName.value = "";
        Array.from(this.checkboxes).forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}
window.customElements.define('todo-add', TodoAdd);