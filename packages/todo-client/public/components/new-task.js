export class NewTask extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `<input type="text" palceholder="New task">
        <button>Add</button>
`

        this.querySelector('button').addEventListener('click', () => {
           this.dispatchEvent(new CustomEvent('addTask', {detail: {title: this.querySelector('input').value}}))
        })
    }
}
