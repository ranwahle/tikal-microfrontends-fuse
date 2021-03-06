const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const nanoid = require('nanoid');
const getArguments = require('get-arguments-lib');
const processArguments = getArguments(process.argv);
const port = +processArguments.port || 3006;
const cors = require('cors');


let database;
if (fs.existsSync('todos.db.json')) {
    database = JSON.parse(fs.readFileSync('todos.db.json').toString());
} else {
    database = [];
}

const writeDatabase = () => {
    fs.writeFileSync('todos.db.json', JSON.stringify(database));
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res, next) => {
    res.status(200);
    res.send(database);
    next();
});

app.post('/', (req, res, next) => {
    try {
        const body = req.body || {};
        const { title } = body;
        if (!title) {
            throw new Error('No title', JSON.stringify(body));
        }
        database.push({
            title,
            done: false,
            id: nanoid(),
            created: Date.now()
        });
        writeDatabase();
        res.status(200);
        res.send(database.slice(-1));
    } catch (err) {
        res.status(400);
        res.send(err.message);
    }
});

app.put('/:uuid/assign/:contactuuid', (req, res, next) => {
    const uuid = req.params.uuid;
    const contactUuid = req.params.contactuuid;
    const existingTodo = database.find(lookup => lookup.id === uuid);
    if (existingTodo) {
        existingTodo.assigned = contactUuid;
        writeDatabase();
        res.status(200).send(existingTodo);
        return next();
    }
    res.status(404);
    res.send('Could not find todo with id ' + uuid);
    next(false);

});

app.put('/:uuid/:done', (req, res, next) => {
    const uuid = req.params.uuid;
    const done = req.params.done === '1';
    const existingTodo = database.find(lookup => lookup.id === uuid);
    if (existingTodo) {
        existingTodo.done = done;
        writeDatabase();
        res.status(200);
        res.send(existingTodo);
        return next();
    }
    res.status(404);
    res.send('Could not find todo with id ' + uuid);
    next(false);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
