import {getTasks, addTask} from "../todo-service.js";
import {NewTask} from "./new-task.js";

export class Todolist extends HTMLElement {

    padLeft(stringToPad, length, paddingCharacter) {

        while(stringToPad.length < length) {
            stringToPad = `${paddingCharacter}${stringToPad}`;
        }
        return stringToPad;

    }


    formatDate(date) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${this.padLeft('' + date.getMinutes(), 2, '0')}`;
    }


    setEvents() {

        this.querySelector('new-task').addEventListener('addTask', async(task) => {
           await addTask(task.detail);
           this.loadData();
        })
    }

    renderTasks(tasks) {
        return `<ul>
               ${tasks.map(task => `<li>${task.title} Created on ${this.formatDate(new Date(task.created))}</li>`).join('')}
        </ul>`
    }

    async loadData() {
        const tasks = await getTasks();
        this.render(tasks);
    }

    async connectedCallback() {

        await this.loadData();

        this.setEvents();
    }

    render(tasks) {
        this.innerHTML = `<h2> Here are our tasks </h2>
                ${this.renderTasks(tasks)}
        <new-task/>

`
    }


}

customElements.define('new-task', NewTask)
