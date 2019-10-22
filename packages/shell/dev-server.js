const express = require('express');
const proxy = require('express-http-proxy');

const getArguments = require('get-arguments-lib');
const processArguments = getArguments(process.argv);
const port = +processArguments.port || 8080;

const app = express();
app.use('/', express.static('public'))

app.use('/node_modules/', express.static('node_modules'))


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
