const express = require('express');
const cors = require('cors');

const getArguments = require('get-arguments-lib');
const processArguments = getArguments(process.argv);
const port = +processArguments.port || 5000;

const app = express();
app.use(cors())
app.use('/', express.static('public'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


