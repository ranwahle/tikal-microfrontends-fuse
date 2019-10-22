const BASE_URL = 'http://localhost:3006'

export async function getTasks() {
    const response = await fetch(BASE_URL);

    const tasks = await response.json();

    return tasks;
}

export async function addTask(task) {

    const reqponse = await fetch(BASE_URL, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task)
    });


}