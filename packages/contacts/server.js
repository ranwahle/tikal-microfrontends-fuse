const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const nanoid = require('nanoid');

const app = express({
    dotfiles: 'ignore',
    index: false
});

const database = JSON.parse(fs.readFileSync('contacts.db.json').toString());

const writeDatabase = () => {
    fs.writeFileSync('contacts.db.json', JSON.stringify(database));
};

app.use(bodyParser.json());

app.use(cors());
// load initial database

app.get('/contacts', (req, res, next) => {
    res.send(database.results.map(contact => {
        return {
            name: contact.name,
            email: contact.email,
            uuid: contact.login.uuid,
        }
    }));
    next();
});

app.get('/contact/:uuid', (req, res, next) => {
    const contact = database.results.find((lookup) => {
        return req.params.uuid === lookup.login.uuid
    });
    if (contact) {
        res.send(contact);
    } else {
        res.status(404);
        res.end();
        next(false);
    }
});

app.put('/contact/:uuid', (req, res, next) => {
    try {
        const body = req.body || {};
        const uuid = req.params.uuid;
        const { name, location, email, phone, cell } = body;
        if (!uuid || !body || !name || !name.first || !email) {
            throw new Error('Request incomplete');
        }
        const existingUser = database.results.find(lookup => {
            return req.params.uuid === lookup.login.uuid;
        });
        if (existingUser) {
            existingUser.name = {
                first: String(name.first),
                title: name.title || '',
                last: name.last || ''
            };
            existingUser.email = email;
            existingUser.location = location;
            existingUser.phone = phone;
            existingUser.cell = cell;
            writeDatabase();
            res.send(existingUser);
            res.end();
            next();
        } else {
            res.status(404);
            res.end();
            next(false);
        }
    } catch (err) {
        res.status(400);
        res.end();
        next(false);
    }
});

app.post('/contact', (req, res, next) => {
    try {
        const body = req.body;
        const { name, location, email, phone, cell } = body;
        if (!name || !email || !name.first) {
            throw new Error('Mandatory name and email');
        }
        const newContact = {
            name: {
                first: String(name.first),
                title: name.title || '',
                last: name.last || ''
            },
            location: location || {
                street: {
                    number: undefined,
                    name: 'N/A'
                },
                city: 'N/A',
                state: 'N/A',
                country: 'N/A',
                postcode: 'N/A'
            },
            email,
            phone: phone || 'N/A',
            cell: cell || 'N/A',
            login: {
                uuid: nanoid()
            }
        };
        database.results.push(newContact);
        writeDatabase();
        res.send(newContact);
        next();
    } catch (err) {
        res.status(400);
        res.end(err.message);
        next(false);
    }
});



app.listen(3005);
